export const calculateCoverImageDimensions = (
  image: HTMLImageElement | null | undefined,
  canvasWidth: number,
  canvasHeight: number,
) => {
  if (!image) {
    return { width: canvasWidth, height: canvasHeight, x: 0, y: 0 };
  }

  const scaleX = canvasWidth / image.width;
  const scaleY = canvasHeight / image.height;

  const scale = Math.max(scaleX, scaleY);

  const imgWidth = image.width * scale;
  const imgHeight = image.height * scale;

  const x = (canvasWidth - imgWidth) / 2;
  const y = (canvasHeight - imgHeight) / 2;

  return { width: imgWidth, height: imgHeight, x, y };
};
