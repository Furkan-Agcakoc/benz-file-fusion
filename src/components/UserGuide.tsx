
import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileJson, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UserGuide: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="my-8 animate-scale-in">
      <Button 
        variant="outline" 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2 bg-white mb-4 border-mercedes-darkblue text-mercedes-darkblue hover:bg-mercedes-lightsilver"
      >
        <BookOpen className="h-4 w-4" />
        <span>Bedienungsanleitung {expanded ? 'ausblenden' : 'anzeigen'}</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-1" />
        )}
      </Button>
      
      {expanded && (
        <Card className="border border-gray-200 shadow-mercedes bg-white rounded-lg overflow-hidden mb-8 animate-fade-in">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-mercedes-darkblue mb-4">
              Anleitung zur Nutzung der Fahrzeugliste
            </h2>
            <p className="text-gray-600 mb-6">
              Willkommen auf der Datei-Upload-Seite für Mercedes-Benz Mitarbeiter. Diese Anleitung führt Sie durch die einzelnen Schritte, um die Fahrzeugliste erfolgreich zu erstellen und herunterzuladen.
            </p>
            
            <Accordion type="single" collapsible defaultValue="step1" className="w-full">
              <AccordionItem value="step1" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-mercedes-darkblue hover:no-underline group">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mercedes-lightsilver text-mercedes-darkblue">
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Schritt 1: SAFIR Excel-Datei hochladen</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4 pl-12 text-gray-600">
                  Bitte beginnen Sie, indem Sie die SAFIR Excel-Datei in das dafür vorgesehene Feld ziehen und ablegen. Diese Datei enthält die notwendigen Informationen für die Fahrzeugkonfiguration.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step2" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-mercedes-darkblue hover:no-underline group">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mercedes-lightsilver text-mercedes-darkblue">
                      <FileJson className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Schritt 2: slots.json Datei hochladen</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4 pl-12 text-gray-600">
                  Als nächstes laden Sie die slots.json Datei hoch, die Sie aus dem TestBenchHub herunterladen können. Diese Datei enthält die Slot-Informationen, die für die Fahrzeugkonfiguration erforderlich sind.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step3" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-mercedes-darkblue hover:no-underline group">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mercedes-lightsilver text-mercedes-darkblue">
                      <Filter className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Schritt 3: SA-Codes filtern (optional)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4 pl-12 text-gray-600">
                  Sie haben die Möglichkeit, die zu integrierenden SA-Codes zu filtern. Nutzen Sie die Filterfunktion, um die gewünschten SA-Codes auszuwählen. Falls der benötigte SA-Code nicht vorhanden ist, können Sie einen neuen SA-Code erstellen und durch Anklicken der entsprechenden Checkbox hinzufügen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="step4" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-mercedes-darkblue hover:no-underline group">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mercedes-lightsilver text-mercedes-darkblue">
                      <Download className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Schritt 4: Fahrzeugliste herunterladen</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4 pl-12 text-gray-600">
                  Nachdem Sie alle erforderlichen Dateien hochgeladen und die SA-Codes konfiguriert haben, klicken Sie auf den Button "Herunterladen". Warten Sie, bis die Fahrzeugliste als Excel-Datei generiert und heruntergeladen wird.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <p className="text-gray-600 mt-6 text-center italic">
              Vielen Dank für Ihre Aufmerksamkeit und viel Erfolg bei der Nutzung der Datei-Upload-Seite!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserGuide;
