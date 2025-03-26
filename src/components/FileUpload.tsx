
import React, { useState } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { handleSubmit } from '@/utils/api';
import FileDropZone from './FileDropZone';
import UserGuide from './UserGuide';
import Filter from './Filter';

const FileUpload: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [selectedSACodes, setSelectedSACodes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExcelDrop = (file: File) => {
    setExcelFile(file);
    toast.success(`Excel-Datei erfolgreich hochgeladen: ${file.name}`);
  };

  const handleJsonDrop = (file: File) => {
    setJsonFile(file);
    toast.success(`JSON-Datei erfolgreich hochgeladen: ${file.name}`);
  };

  const removeExcelFile = () => {
    setExcelFile(null);
    toast("Excel-Datei entfernt");
  };

  const removeJsonFile = () => {
    setJsonFile(null);
    toast("JSON-Datei entfernt");
  };

  const handleFormSubmit = async () => {
    if (!excelFile || !jsonFile) {
      toast.error("Bitte laden Sie sowohl eine Excel-Datei als auch eine JSON-Datei hoch.", {
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      toast.promise(
        handleSubmit(excelFile, jsonFile, selectedSACodes),
        {
          loading: 'Fahrzeugliste wird erstellt...',
          success: () => {
            return 'Fahrzeugliste wurde erfolgreich heruntergeladen!';
          },
          error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        }
      );
    } catch (error) {
      console.error("Error submitting files:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mercedes-container">
      <div className="mb-10 text-center">
        <div className="inline-block mb-6">
          <svg className="h-12 w-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" stroke="#000000" strokeWidth="10"/>
            <path d="M100 5C153.019 5 195 46.9807 195 100C195 153.019 153.019 195 100 195C46.9807 195 5 153.019 5 100C5 46.9807 46.9807 5 100 5ZM100 35C63.5493 35 35 63.5493 35 100C35 136.451 63.5493 165 100 165C136.451 165 165 136.451 165 100C165 63.5493 136.451 35 100 35Z" fill="#000000"/>
            <path d="M40 100L100 40L160 100L100 160L40 100Z" fill="#000000"/>
          </svg>
        </div>
        <h1 className="text-4xl font-light text-mercedes-darkblue mb-4">Mercedes-Benz Fahrzeugliste</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Erstellen Sie effizient Ihre Fahrzeugliste durch das Hochladen der erforderlichen Dateien und die Auswahl der gewünschten SA-Codes.
        </p>
      </div>

      <UserGuide />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <FileDropZone
          onFileDrop={handleExcelDrop}
          acceptedFormats={['xlsx', 'xls']}
          file={excelFile}
          onRemove={removeExcelFile}
          label="SAFIR Excel-Datei hochladen"
          icon="excel"
        />
        
        <FileDropZone
          onFileDrop={handleJsonDrop}
          acceptedFormats={['json']}
          file={jsonFile}
          onRemove={removeJsonFile}
          label="slots.json Datei hochladen"
          icon="json"
        />
      </div>

      <Filter
        selectedSACodes={selectedSACodes}
        setSelectedSACodes={setSelectedSACodes}
      />

      <div className="text-center mt-12 mb-6 animate-slide-in">
        <Button
          onClick={handleFormSubmit}
          disabled={isSubmitting || !excelFile || !jsonFile}
          className={`bg-mercedes-darkblue hover:bg-mercedes-blue text-white py-3 px-8 rounded-md transition-all duration-300 text-lg flex items-center justify-center space-x-2 mx-auto ${
            (!excelFile || !jsonFile) ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-mercedes-hover'
          }`}
        >
          <Download className="h-5 w-5 mr-2" />
          Fahrzeugliste herunterladen
        </Button>
        
        {(!excelFile || !jsonFile) && (
          <p className="text-gray-500 text-sm mt-2 animate-fade-in">
            Bitte laden Sie beide Dateien hoch, um fortzufahren
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
