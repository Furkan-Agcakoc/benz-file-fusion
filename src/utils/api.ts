
// API utility functions for the Mercedes-Benz file upload application

// Fetch SA codes from the server
export const fetchSACodes = async (): Promise<string[]> => {
  try {
    // This would be replaced with your actual API endpoint
    // const response = await fetch('/api/sa-codes');
    // const data = await response.json();
    // return data.sa_codes;
    
    // For demo purposes, return some sample SA codes
    return [
      "S01", "S02", "S03", "S04", "S05", 
      "S06", "S07", "S08", "S09", "S10",
      "P31", "P55", "P64", "P82", "P87"
    ];
  } catch (error) {
    console.error("Error fetching SA codes:", error);
    return [];
  }
};

// Add a new SA code
export const addSACode = async (code: string): Promise<{ sa_codes: string[] } | null> => {
  try {
    // This would be replaced with your actual API endpoint
    // const response = await fetch('/api/sa-codes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ code }),
    // });
    // const data = await response.json();
    // return data;
    
    // For demo purposes, simulate adding a code
    const existingCodes = await fetchSACodes();
    if (!existingCodes.includes(code)) {
      const updatedCodes = [...existingCodes, code];
      return { sa_codes: updatedCodes };
    }
    return { sa_codes: existingCodes };
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

    // This would be replaced with your actual API endpoint
    // const response = await fetch('/api/generate-vehicle-list', {
    //   method: 'POST',
    //   body: formData,
    // });
    
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'Fahrzeugliste.xlsx';
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
    // a.remove();

    // Simulate a longer delay for demonstration purposes
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // For demo purposes, create and trigger a fake download
    const a = document.createElement('a');
    a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAABgAAABbbL...';
    a.download = 'Fahrzeugliste.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    
    return true;
  } catch (error) {
    console.error("Error submitting files:", error);
    return false;
  }
};
