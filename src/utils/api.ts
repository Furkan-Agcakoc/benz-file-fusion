
// API utility functions for the Mercedes-Benz file upload application

// Fetch SA codes from the server
export const fetchSACodes = async (): Promise<string[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/sa-codes');
    const data = await response.json();
    return data.sa_codes;
  } catch (error) {
    console.error("Error fetching SA codes:", error);
    return [];
  }
};

// Add a new SA code
export const addSACode = async (code: string): Promise<{ sa_codes: string[] } | null> => {
  try {
    const response = await fetch('http://localhost:5000/api/sa-codes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding SA code:", error);
    return null;
  }
};

// Handle form submission
export const handleSubmit = async (
  excelFile: File,
  jsonFile: File,
  selectedSACodes: string[]
): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('excelFile', excelFile);
    formData.append('jsonFile', jsonFile);
    formData.append('saCodes', JSON.stringify(selectedSACodes));

    const response = await fetch('http://localhost:5000/api/generate-vehicle-list', {
      method: 'POST',
      body: formData,
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fahrzeugliste.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    
    return true;
  } catch (error) {
    console.error("Error submitting files:", error);
    return false;
  }
};
