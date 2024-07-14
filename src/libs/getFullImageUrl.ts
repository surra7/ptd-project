export const getFullImageUrl = (path: string) => {
  const baseUrl = 'https://api.petodo.today';
  return `${baseUrl}${path}`;
};
