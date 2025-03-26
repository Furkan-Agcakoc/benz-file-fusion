
import React from 'react';
import FileUpload from '@/components/FileUpload';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-mercedes-darkblue text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-light">Mercedes-Benz File Fusion</h1>
            <div className="text-sm">Fahrzeugliste-Generator</div>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <FileUpload />
      </main>
      
      <footer className="border-t border-gray-200 py-6 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mercedes-Benz Group AG. Alle Rechte vorbehalten.</p>
          <p className="mt-1">Entwickelt für die interne Nutzung durch Mercedes-Benz Mitarbeiter.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
