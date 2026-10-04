// Put in: src/components/dailychalanges/ShareModal.tsx
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Copy, Facebook, MessageCircle, Share2, Twitter, X } from "lucide-react";

/** public link of a submission (the single-submission page) */
export const getSubmissionUrl = (id: string) => `${window.location.origin}/mag-challenge/submission/${id}`;

type Props = {
  open: boolean;
  onClose: () => void;
  submissionId: string | null;
  title?: string;
  /** e.g. "Entry submitted!" after an upload; leave empty for a plain share */
  heading?: string;
};

const ShareModal = ({ open, onClose, submissionId, title, heading }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !submissionId) return null;

  const url = getSubmissionUrl(submissionId);
  const text = `${title ? `Vote for my entry "${title}"` : "Vote for my entry"} on the MAG Challenge!`;
  const enc = encodeURIComponent;

  const copy = () =>
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Couldn't copy, select the link and copy it manually"));

  const nativeShare = () => navigator.share?.({ title: "MAG Challenge", text, url }).catch(() => undefined);

  const targets = [
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${enc(`${text} ${url}`)}`, color: "#25D366" },
    { label: "X", icon: Twitter, href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`, color: "#111827" },
    { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, color: "#1877F2" },
  ];

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 shadow-2xl p-6"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{heading || "Share your entry"}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Send this link to friends. They can watch your entry and vote for it.
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 min-w-0 bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none"
          />
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
          >
            <Copy size={14} /> Copy
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {targets.map(({ label, icon: Icon, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 dark:border-gray-800 py-3 hover:shadow-sm transition-all"
            >
              <Icon size={20} style={{ color }} />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{label}</span>
            </a>
          ))}
        </div>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={nativeShare}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-2.5"
          >
            <Share2 size={16} /> More options
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareModal;