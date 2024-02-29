export const fetchFont = async (fontName: string): Promise<string> => {
  // Ваша логіка завантаження шрифту
  const response = await fetch(`/src/assets/fonts/${fontName}`);
  const data = await response.blob();
  return URL.createObjectURL(data);
};
