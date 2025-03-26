
import React, { useState, useRef } from 'react';
import { FileIcon, Trash2Icon, UploadIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileDropZoneProps {
  onFileDrop: (file: File) => void;
  acceptedFormats: string[];
  file: File | null;
  onRemove: () => void;
  label: string;
  icon: "excel" | "json";
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFileDrop,
  acceptedFormats,
  file,
  onRemove,
  label,
  icon
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      validateAndProcessFile(droppedFiles[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (acceptedFormats.includes(fileExtension)) {
      onFileDrop(file);
    } else {
      // Toast or alert for invalid file
      alert(`Ungültiges Dateiformat. Bitte laden Sie eine ${acceptedFormats.join(' oder ')} Datei hoch.`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6 animate-scale-in">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptedFormats.map(format => `.${format}`).join(',')}
        className="hidden"
      />

      {!file ? (
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "drop-area cursor-pointer min-h-[180px] group",
            isDragOver && "drop-area-active",
          )}
        >
          {icon === "excel" ? (
            <div className="w-16 h-16 mb-3 text-mercedes-darkblue">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41 10H25V16H41V10Z" fill="#21A366"/>
                <path d="M25 10H7V16H25V10Z" fill="#33C481"/>
                <path d="M41 16H25V24H41V16Z" fill="#107C41"/>
                <path d="M25 16H7V24H25V16Z" fill="#185C37"/>
                <path d="M41 24H25V32H41V24Z" fill="#107C41"/>
                <path d="M25 24H7V32H25V24Z" fill="#185C37"/>
                <path d="M41 32H25V40H41V32Z" fill="#107C41"/>
                <path d="M25 32H7V40H25V32Z" fill="#185C37"/>
                <path d="M13.95 19L16.05 24.5L13.9 30H16.5L17.85 26.65C17.9167 26.4833 17.9667 26.3167 18 26.15H18.05C18.0667 26.2833 18.1167 26.45 18.2 26.65L19.65 30H22.05L19.85 24.4L21.9 19H19.3L18.1 22.15C18.0333 22.2833 17.9833 22.4167 17.95 22.55H17.9C17.8667 22.4167 17.8167 22.2833 17.75 22.15L16.5 19H13.95Z" fill="white"/>
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 mb-3 text-mercedes-darkblue">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM19 21C17.8954 21 17 21.8954 17 23V25C17 26.1046 17.8954 27 19 27H29C30.1046 27 31 26.1046 31 25V23C31 21.8954 30.1046 21 29 21H19Z" fill="#001E50"/>
                <path d="M19 21C17.8954 21 17 21.8954 17 23V25C17 26.1046 17.8954 27 19 27H29C30.1046 27 31 26.1046 31 25V23C31 21.8954 30.1046 21 29 21H19Z" fill="#00ADEF"/>
              </svg>
            </div>
          )}
          
          <p className="text-lg font-medium mb-2 text-mercedes-darkblue">{label}</p>
          <p className="text-sm text-gray-500 mb-4">
            Ziehen Sie eine Datei hierher oder klicken Sie, um zu durchsuchen
          </p>
          <p className="text-xs text-gray-400">
            Akzeptierte Formate: {acceptedFormats.map(format => `.${format}`).join(', ')}
          </p>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mercedes-blue to-mercedes-darkblue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg"></div>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-mercedes animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {icon === "excel" ? (
                <div className="w-10 h-10 flex-shrink-0">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41 10H25V16H41V10Z" fill="#21A366"/>
                    <path d="M25 10H7V16H25V10Z" fill="#33C481"/>
                    <path d="M41 16H25V24H41V16Z" fill="#107C41"/>
                    <path d="M25 16H7V24H25V16Z" fill="#185C37"/>
                    <path d="M41 24H25V32H41V24Z" fill="#107C41"/>
                    <path d="M25 24H7V32H25V24Z" fill="#185C37"/>
                    <path d="M41 32H25V40H41V32Z" fill="#107C41"/>
                    <path d="M25 32H7V40H25V32Z" fill="#185C37"/>
                    <path d="M13.95 19L16.05 24.5L13.9 30H16.5L17.85 26.65C17.9167 26.4833 17.9667 26.3167 18 26.15H18.05C18.0667 26.2833 18.1167 26.45 18.2 26.65L19.65 30H22.05L19.85 24.4L21.9 19H19.3L18.1 22.15C18.0333 22.2833 17.9833 22.4167 17.95 22.55H17.9C17.8667 22.4167 17.8167 22.2833 17.75 22.15L16.5 19H13.95Z" fill="white"/>
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 flex-shrink-0">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM19 21C17.8954 21 17 21.8954 17 23V25C17 26.1046 17.8954 27 19 27H29C30.1046 27 31 26.1046 31 25V23C31 21.8954 30.1046 21 29 21H19Z" fill="#001E50"/>
                    <path d="M19 21C17.8954 21 17 21.8954 17 23V25C17 26.1046 17.8954 27 19 27H29C30.1046 27 31 26.1046 31 25V23C31 21.8954 30.1046 21 29 21H19Z" fill="#00ADEF"/>
                  </svg>
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="text-mercedes-darkblue font-medium truncate max-w-[260px] sm:max-w-xs md:max-w-sm">
                  {file.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRemove}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex-1 bg-gray-200 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full w-full"></div>
            </div>
            <div className="ml-3">
              <CheckIcon className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
