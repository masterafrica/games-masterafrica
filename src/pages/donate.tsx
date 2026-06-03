import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

const PAYMENT_METHODS = ["Wema Bank", "Opay", "Access Bank"];

const ACCOUNTS = [
  {
    currency: "Naira",
    accountName: "Master Apprenticeship and Recruitment Technology",
    accountNumber: "1026219724",
    bankName: "UBA",
  },
  {
    currency: "Dollar",
    accountName: "Master Apprenticeship and Recruitment Technology",
    accountNumber: "3004094361",
    bankName: "UBA",
  },
];

const DonatePage = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (
    fieldKey: string,
    value: string,
    label: string,
  ) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(fieldKey);
    toast.success(`${label} copied`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          alt="Background"
          className="w-full h-full object-cover"
          src="/images/donate-bg.jpg"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-5">
        <Link className="flex items-center gap-2" href="/">
          <img
            alt="Master Africa"
            className="w-9 h-9 object-contain"
            src="/images/logo.svg"
          />
          <span className="text-white font-semibold hidden sm:block">
            Master Africa
          </span>
        </Link>

        <Button
          as={Link}
          className="border border-white/40 text-white font-medium"
          href="/auth/signup"
          radius="full"
          variant="bordered"
        >
          Sign Up
        </Button>
      </header>

      {/* Content */}
      <main className="relative z-10 flex items-center justify-center px-4 py-10 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
          {/* Left — Pay with Bank */}
          <div className="bg-white px-8 pt-10 pb-0 flex flex-col order-2 md:order-1">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
                Pay with Bank
              </h2>
              <p className="text-sm text-gray-500">
                {PAYMENT_METHODS.join("  ·  ")}
              </p>
            </div>

            {/* Card art — bleeds toward the left edge */}
            <div className="mt-6 flex-1 flex items-end justify-center overflow-visible">
              <img
                alt="Pay with card"
                className="w-[115%] max-w-none object-contain -ml-8 drop-shadow-2xl"
                src="/images/donate-img.png"
              />
            </div>
          </div>

          {/* Right — Bank Transfer */}
          <div className="bg-gradient-to-br from-[#3a1d6e] to-[#6d28d9] p-8 lg:p-10 text-white flex flex-col order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-6">Bank Transfer</h2>

            <div className="space-y-6">
              {ACCOUNTS.map((account) => (
                <div
                  key={account.currency}
                  className="space-y-4 pb-6 border-b border-white/10 last:border-none last:pb-0"
                >
                  <p className="inline-block text-xs font-semibold uppercase tracking-wide text-violet-200 bg-white/10 rounded-full px-3 py-1">
                    {account.currency} Account
                  </p>
                  <Field
                    copied={copiedField === `${account.currency}-name`}
                    label="Account Name"
                    value={account.accountName}
                    onCopy={() =>
                      copyToClipboard(
                        `${account.currency}-name`,
                        account.accountName,
                        "Account name",
                      )
                    }
                  />
                  <Field
                    copied={copiedField === `${account.currency}-number`}
                    label="Account Number"
                    value={account.accountNumber}
                    onCopy={() =>
                      copyToClipboard(
                        `${account.currency}-number`,
                        account.accountNumber,
                        "Account number",
                      )
                    }
                  />
                  <Field
                    copied={copiedField === `${account.currency}-bank`}
                    label="Bank Name"
                    value={account.bankName}
                    onCopy={() =>
                      copyToClipboard(
                        `${account.currency}-bank`,
                        account.bankName,
                        "Bank name",
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

const Field = ({ label, value, copied, onCopy }: FieldProps) => (
  <div>
    <p className="text-base font-medium text-white/70 mb-1">{label}</p>
    <div className="flex items-center gap-3">
      <span className="text-xl font-semibold text-white">{value}</span>
      <button
        aria-label={`Copy ${label}`}
        className="text-white/60 hover:text-white transition-colors"
        type="button"
        onClick={onCopy}
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-400" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>
    </div>
  </div>
);

export default DonatePage;
