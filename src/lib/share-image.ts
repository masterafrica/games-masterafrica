/**
 * Generate a shareable image with embedded points
 * Uses canvas to overlay points on the Master Africa Games image
 */

export interface ShareImageConfig {
  playerName: string;
  points: number;
  title?: string;
  imageUrl?: string;
}

/**
 * Creates a canvas with the base image and overlays the points
 */
export const generateShareImage = async (
  config: ShareImageConfig
): Promise<Blob> => {
  const {
    playerName,
    points,
    title = "Master Africa Games",
    imageUrl = "/images/image.png",
  } = config;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    canvas.width = 1024;
    canvas.height = 1024;

    // Load the base image
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      // Draw the base image scaled to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Set up text styles
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";

      // Ensure Google font is loaded before drawing
      try {
        await document.fonts.load('700 80px "Stack Sans Text"');
        await document.fonts.load('400 22px "Stack Sans Text"');
      } catch (_) {
        // If font fails to load, canvas will fallback to system fonts
      }

      // Draw player name
      // ctx.font = "bold 72px Arial";
      // ctx.fillStyle = "#FFFFFF";
      // ctx.fillText(playerName, canvas.width / 2, canvas.height - 380);

      ctx.font = 'bold 80px "Stack Sans Text"';
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 6;
      const scoreText = `${points.toLocaleString()}`;
      const scoreX = Number(canvas.width * 0.10);
      const scoreY = Number(canvas.height / 2) + 120;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.strokeText(scoreText, scoreX, scoreY);
      ctx.fillStyle = "#4c2e86";
      ctx.fillText(scoreText, scoreX, scoreY);

      // Draw "POINTS" label (left-aligned, no stroke)
      ctx.font = '22px "Stack Sans Text"';
      const labelText = "Points:";
      const labelX = scoreX; 
      const labelY = Number(canvas.height / 2) + 45;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(labelText, labelX, labelY);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to generate image blob"));
          }
        },
        "image/png",
        0.95
      );
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };

    img.src = imageUrl;
  });
};

/**
 * Share the generated image using Web Share API
 */
export const shareImage = async (
  blob: Blob,
  fileName: string = "master-africa-score.png"
): Promise<void> => {
  // Check if Web Share API is available
  if (
    !navigator.share ||
    !navigator.canShare ||
    !navigator.canShare({ files: [new File([blob], fileName)] })
  ) {
    // Fallback: Download the image
    downloadImage(blob, fileName);
    return;
  }

  try {
    const file = new File([blob], fileName, { type: "image/png" });
    await navigator.share({
      files: [file],
      title: "Master Africa Games",
      text: "Check out my score on Master Africa Games! 🎮 #MAG",
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Share failed:", error);
      // Fallback to download
      downloadImage(blob, fileName);
    }
  }
};

/**
 * Download the image to user's device
 */
export const downloadImage = (
  blob: Blob,
  fileName: string = "master-africa-score.png"
): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy the generated image to clipboard
 */
export const copyImageToClipboard = async (blob: Blob): Promise<boolean> => {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
    return false;
  }
};
