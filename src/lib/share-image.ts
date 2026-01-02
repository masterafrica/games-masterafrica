/**
 * Generate a shareable image with embedded points
 * Uses canvas to overlay points on the Master Africa Games image
 */

export interface ShareImageConfig {
  playerName: string;
  points: number;
  title?: string;
  gameTitle?: string;
  rank?: number;
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
    gameTitle,
    rank,
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

    img.onload = () => {
      // Draw the base image scaled to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Add a semi-transparent overlay at the bottom
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

      // Add gradient overlay for better text visibility
      const gradient = ctx.createLinearGradient(
        0,
        canvas.height * 0.5,
        0,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

      // Set up text styles
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";

      // Draw rank badge if provided
      if (rank) {
        ctx.font = "bold 48px Arial";
        ctx.fillStyle = "#FFD700";
        ctx.fillText(`#${rank}`, canvas.width / 2, canvas.height - 520);
      }

      // Draw player name
      ctx.font = "bold 72px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(playerName, canvas.width / 2, canvas.height - 380);

      // Draw game title if provided
      if (gameTitle) {
        ctx.font = "48px Arial";
        ctx.fillStyle = "#FFD700";
        ctx.fillText(gameTitle, canvas.width / 2, canvas.height - 280);
      }

      // Draw points
      ctx.font = "bold 96px Arial";
      ctx.fillStyle = "#FFD700";
      ctx.fillText(`${points.toLocaleString()}`, canvas.width / 2, canvas.height - 120);

      // Draw "POINTS" label
      ctx.font = "48px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("POINTS", canvas.width / 2, canvas.height - 20);

      // Draw title/branding at the top
      ctx.font = "bold 56px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(title, canvas.width / 2, 100);

      // Draw hashtag
      ctx.font = "42px Arial";
      ctx.fillStyle = "#FFD700";
      ctx.fillText("#MAG", canvas.width / 2, 170);

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
