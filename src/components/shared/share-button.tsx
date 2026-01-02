import { Button } from "@heroui/button";
import { Share2, Download, Copy, Loader } from "lucide-react";
import { useState } from "react";
import {
  generateShareImage,
  shareImage,
  downloadImage,
  copyImageToClipboard,
  ShareImageConfig,
} from "@/lib/share-image";

interface ShareButtonProps extends ShareImageConfig {
  buttonSize?: "sm" | "md" | "lg";
  buttonVariant?: "solid" | "bordered" | "flat" | "faded" | "shadow" | "ghost";
  showLabel?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const ShareButton = ({
  playerName,
  points,
  title,
  gameTitle,
  rank,
  imageUrl,
  buttonSize = "md",
  buttonVariant = "flat",
  showLabel = true,
  onSuccess,
  onError,
}: ShareButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerateAndShare = async () => {
    setLoading(true);
    try {
      const config: ShareImageConfig = {
        playerName,
        points,
        title,
        gameTitle,
        rank,
        imageUrl,
      };

      const imageBlob = await generateShareImage(config);
      await shareImage(
        imageBlob,
        `${playerName.replace(/\s+/g, "-")}-mag-score.png`
      );

      onSuccess?.();
      setShowOptions(false);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error("Share failed:", err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const config: ShareImageConfig = {
        playerName,
        points,
        title,
        gameTitle,
        rank,
        imageUrl,
      };

      const imageBlob = await generateShareImage(config);
      downloadImage(
        imageBlob,
        `${playerName.replace(/\s+/g, "-")}-mag-score.png`
      );

      onSuccess?.();
      setShowOptions(false);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error("Download failed:", err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    setLoading(true);
    try {
      const config: ShareImageConfig = {
        playerName,
        points,
        title,
        gameTitle,
        rank,
        imageUrl,
      };

      const imageBlob = await generateShareImage(config);
      const success = await copyImageToClipboard(imageBlob);

      if (success) {
        onSuccess?.();
        setShowOptions(false);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error("Copy to clipboard failed:", err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        color="primary"
        endContent={
          loading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Share2 size={18} />
          )
        }
        isDisabled={loading}
        size={buttonSize}
        variant={buttonVariant}
        onPress={() => setShowOptions(!showOptions)}
      >
        {showLabel && "Share Score"}
      </Button>

      {/* Share options dropdown */}
      {showOptions && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px] overflow-hidden">
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
            onClick={handleGenerateAndShare}
            disabled={loading}
          >
            <Share2 size={16} />
            <span className="text-sm">Share</span>
          </button>

          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors border-t border-gray-200 dark:border-gray-700"
            onClick={handleDownload}
            disabled={loading}
          >
            <Download size={16} />
            <span className="text-sm">Download</span>
          </button>

          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors border-t border-gray-200 dark:border-gray-700"
            onClick={handleCopyToClipboard}
            disabled={loading}
          >
            <Copy size={16} />
            <span className="text-sm">Copy Image</span>
          </button>
        </div>
      )}
    </div>
  );
};
