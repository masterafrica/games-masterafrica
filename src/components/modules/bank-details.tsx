import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const BANK = [
  {
    label: "Account Name",
    value: "Master Apprenticeship and Recruitment Technology",
  },
  { label: "Bank", value: "UBA" },
  { label: "Account No.", value: "1026219724", copy: true },
  { label: "Currency", value: "Naira (₦)" },
];

export const BankDetails = () => (
  <dl className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
    {BANK.map((row) => (
      <div key={row.label} className="flex justify-between gap-4 text-xs">
        <dt className="text-gray-500 dark:text-gray-400 shrink-0">
          {row.label}
        </dt>
        <dd className="font-semibold text-gray-900 dark:text-white text-right flex items-center gap-2">
          {row.value}
          {row.copy && (
            <button
              aria-label={`Copy ${row.label}`}
              className="text-primary hover:opacity-70 transition-opacity"
              onClick={() =>
                navigator.clipboard
                  .writeText(row.value)
                  .then(() => toast.success("Copied!"))
                  .catch(() => toast.error("Couldn't copy"))
              }
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
        </dd>
      </div>
    ))}
  </dl>
);
