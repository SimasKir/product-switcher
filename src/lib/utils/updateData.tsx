async function updateData(url: string, data: { product: string; state: string }) {
    try {
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'api-key': `${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }

  export default updateData;