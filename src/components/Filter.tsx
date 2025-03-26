
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
import { Search, PlusCircle, FilterIcon } from 'lucide-react';
import { fetchSACodes, addSACode } from '@/utils/api';
import { toast } from 'sonner';

interface FilterProps {
  selectedSACodes: string[];
  setSelectedSACodes: (codes: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedSACodes, setSelectedSACodes }) => {
  const [open, setOpen] = useState(false);
  const [newSACode, setNewSACode] = useState('');
  const [saCodes, setSACodes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCode, setIsAddingCode] = useState(false);
  
  useEffect(() => {
    const loadSACodes = async () => {
      const codes = await fetchSACodes();
      setSACodes(codes);
    };
    loadSACodes();
  }, []);
  
  const handleCheckboxChange = (code: string) => {
    setSelectedSACodes(
      selectedSACodes.includes(code)
        ? selectedSACodes.filter(item => item !== code)
        : [...selectedSACodes, code]
    );
  };
  
  const handleAddSACode = async () => {
    if (newSACode.trim() && !saCodes.includes(newSACode.trim())) {
      setIsAddingCode(true);
      try {
        const result = await addSACode(newSACode.trim());
        if (result) {
          setSACodes(result.sa_codes);
          setNewSACode('');
          toast.success("SA-Code erfolgreich hinzugefügt");
        } else {
          toast.error("Fehler beim Hinzufügen des SA-Codes");
        }
      } catch (error) {
        toast.error("Ein Fehler ist aufgetreten");
      } finally {
        setIsAddingCode(false);
      }
    } else if (saCodes.includes(newSACode.trim())) {
      toast.error("Dieser SA-Code existiert bereits");
    } else {
      toast.error("Bitte geben Sie einen gültigen SA-Code ein");
    }
  };
  
  const filteredCodes = saCodes.filter(code => 
    code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-8 animate-scale-in">
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="w-full md:w-auto flex items-center justify-center gap-2 border-mercedes-darkblue text-mercedes-darkblue hover:bg-mercedes-lightsilver"
      >
        <FilterIcon className="h-4 w-4" />
        <span>SA-Codes filtern</span>
        {selectedSACodes.length > 0 && (
          <span className="ml-2 bg-mercedes-darkblue text-white rounded-full px-2 py-0.5 text-xs">
            {selectedSACodes.length}
          </span>
        )}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-mercedes-darkblue">
              Sonderausstattungen filtern
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Nach SA-Codes suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Neuen SA-Code hinzufügen"
                value={newSACode}
                onChange={(e) => setNewSACode(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAddSACode} 
                disabled={isAddingCode || !newSACode.trim()}
                className="bg-mercedes-darkblue hover:bg-mercedes-blue"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Hinzufügen
              </Button>
            </div>
            
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredCodes.length > 0 ? (
                  filteredCodes.map((code) => (
                    <div key={code} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                      <Checkbox 
                        id={`sa-code-${code}`} 
                        checked={selectedSACodes.includes(code)}
                        onCheckedChange={() => handleCheckboxChange(code)}
                      />
                      <Label 
                        htmlFor={`sa-code-${code}`}
                        className="cursor-pointer w-full"
                      >
                        {code}
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    {searchQuery ? 
                      "Keine SA-Codes mit Ihrem Suchbegriff gefunden" : 
                      "Keine SA-Codes verfügbar"}
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
              Bestätigen ({selectedSACodes.length} ausgewählt)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Filter;
