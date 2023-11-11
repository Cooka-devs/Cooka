export const getImgInText = (text: string) => {
  const parser = new DOMParser();
  const parsedText = parser.parseFromString(text, "text/html");
  const images = parsedText.querySelectorAll("img");
  return images;
};
