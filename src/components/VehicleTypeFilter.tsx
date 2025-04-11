
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, PlusCircle, CarFront } from 'lucide-react';
import { fetchVehicleTypes, addVehicleType } from '@/utils/api';
import { toast } from 'sonner';

interface VehicleTypeFilterProps {
  selectedVehicleTypes: string[];
  setSelectedVehicleTypes: (types: string[]) => void;
}

const VehicleTypeFilter: React.FC<VehicleTypeFilterProps> = ({ selectedVehicleTypes, setSelectedVehicleTypes }) => {
  const [open, setOpen] = useState(false);
  const [newVehicleType, setNewVehicleType] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingType, setIsAddingType] = useState(false);
  
  useEffect(() => {
    const loadVehicleTypes = async () => {
      const types = await fetchVehicleTypes();
      setVehicleTypes(types);
    };
    loadVehicleTypes();
  }, []);
  
  const handleCheckboxChange = (type: string) => {
    setSelectedVehicleTypes(
      selectedVehicleTypes.includes(type)
        ? selectedVehicleTypes.filter(item => item !== type)
        : [...selectedVehicleTypes, type]
    );
  };
  
  const handleAddVehicleType = async () => {
    if (newVehicleType.trim() && !vehicleTypes.includes(newVehicleType.trim())) {
      setIsAddingType(true);
      try {
        const result = await addVehicleType(newVehicleType.trim());
        if (result) {
          setVehicleTypes(result.vehicle_types);
          setNewVehicleType('');
          toast.success("Fahrzeugtyp erfolgreich hinzugefügt");
        } else {
          toast.error("Fehler beim Hinzufügen des Fahrzeugtyps");
        }
      } catch (error) {
        toast.error("Ein Fehler ist aufgetreten");
      } finally {
        setIsAddingType(false);
      }
    } else if (vehicleTypes.includes(newVehicleType.trim())) {
      toast.error("Dieser Fahrzeugtyp existiert bereits");
    } else {
      toast.error("Bitte geben Sie einen gültigen Fahrzeugtyp ein");
    }
  };
  
  const filteredTypes = vehicleTypes.filter(type => 
    type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-8 animate-scale-in">
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="w-full md:w-auto flex items-center justify-center gap-2 border-mercedes-darkblue text-mercedes-darkblue hover:bg-mercedes-lightsilver"
      >
        <CarFront className="h-4 w-4" />
        <span>Slotgruppe filtern</span>
        {selectedVehicleTypes.length > 0 && (
          <span className="ml-2 bg-mercedes-darkblue text-white rounded-full px-2 py-0.5 text-xs">
            {selectedVehicleTypes.length}
          </span>
        )}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-mercedes-darkblue">
              Slotgruppe filtern
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Nach Fahrzeugtypen suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Neuen Fahrzeugtyp hinzufügen"
                value={newVehicleType}
                onChange={(e) => setNewVehicleType(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAddVehicleType} 
                disabled={isAddingType || !newVehicleType.trim()}
                className="bg-mercedes-darkblue hover:bg-mercedes-blue"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Hinzufügen
              </Button>
            </div>
            
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredTypes.length > 0 ? (
                  filteredTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                      <Checkbox 
                        id={`vehicle-type-${type}`} 
                        checked={selectedVehicleTypes.includes(type)}
                        onCheckedChange={() => handleCheckboxChange(type)}
                      />
                      <Label 
                        htmlFor={`vehicle-type-${type}`}
                        className="cursor-pointer w-full"
                      >
                        {type}
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    {searchQuery ? 
                      "Keine Fahrzeugtypen mit Ihrem Suchbegriff gefunden" : 
                      "Keine Fahrzeugtypen verfügbar"}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="border-mercedes-darkblue text-mercedes-darkblue hover:bg-mercedes-lightsilver"
            >
              Schließen
            </Button>
            <Button 
              onClick={() => setOpen(false)}
              className="bg-mercedes-darkblue hover:bg-mercedes-blue"
            >
              Bestätigen ({selectedVehicleTypes.length} ausgewählt)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleTypeFilter;
