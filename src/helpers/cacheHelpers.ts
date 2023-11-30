export const fetchImage = async (imageName: string) => {
  // Завантаження картинки з папки проекту
  const response = await fetch(`/src/assets/images/${imageName}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const fetchFont = async (fontName: string) => {
  // Ваша логіка завантаження шрифту
  const response = await fetch(`/src/assets/fonts/${fontName}`);
  const data = await response.blob();
  return URL.createObjectURL(data);
};
