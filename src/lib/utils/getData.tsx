async function getData(url: string) {
  try {
      const response = await fetch(url, {
          headers: {
              "api-key": `${import.meta.env.VITE_API_KEY}`,
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}

export default getData;