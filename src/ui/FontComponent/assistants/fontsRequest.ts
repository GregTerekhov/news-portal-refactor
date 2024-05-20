export const fetchFont = async (fontName: string): Promise<string> => {
  try {
    const response = await fetch(`/src/assets/fonts/${fontName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.status} - ${response.statusText}`);
    }

    const data = await response.blob();
    return URL.createObjectURL(data);
  } catch (error) {
    console.error('Error fetching font: ', error);
    throw error;
  }
};
