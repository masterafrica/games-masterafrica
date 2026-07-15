import { useState } from "react";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

const PAYMENT_METHODS = ["Wema Bank", "Opay", "Access Bank"];
const CAUSES = ["Community Outreach", "School Outreach"] as const;
const AMOUNTS = ["10k", "20k", "30k", "50k", "100k", "150k"] as const;

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

const formatAmount = (selected: string, custom: string) => {
  if (custom.trim()) {
    const numeric = custom.replace(/[^0-9]/g, "");

    return numeric ? `₦${Number(numeric).toLocaleString()}` : custom;
  }
  if (!selected) return "₦0";
  const value = Number(selected.replace("k", "")) * 1000;

  return `₦${value.toLocaleString()}`;
};

interface GiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiveModal = ({ isOpen, onClose }: GiveModalProps) => {
  const [step, setStep] = useState<"choose" | "pay">("choose");
  const [selectedCause, setSelectedCause] = useState<string>(CAUSES[0]);
  const [selectedAmount, setSelectedAmount] = useState<string>("20k");
  const [customAmount, setCustomAmount] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const reset = () => {
    setStep("choose");
    onClose();
  };

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

  const amountLabel = formatAmount(selectedAmount, customAmount);

  return (
    <Modal
      hideCloseButton={step === "pay"}
      isOpen={isOpen}
      placement="center"
      size={step === "pay" ? "3xl" : "md"}
      onClose={reset}
    >
      <ModalContent>
        <ModalBody className="p-0">
          {step === "choose" ? (
            <div className="px-7 py-9 sm:px-9">
              <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-8">
                Choose Donate
              </h2>

              <div className="bg-gray-100 rounded-full p-1.5 flex mb-7">
                {CAUSES.map((cause) => (
                  <button
                    key={cause}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                      selectedCause === cause
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    type="button"
                    onClick={() => setSelectedCause(cause)}
                  >
                    {cause}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {AMOUNTS.map((amount) => {
                  const active = !customAmount && selectedAmount === amount;

                  return (
                    <button
                      key={amount}
                      className={`py-3 rounded-full text-sm font-medium border transition-all ${
                        active
                          ? "bg-violet-500 text-white border-transparent"
                          : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
                      }`}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                    >
                      {amount}
                    </button>
                  );
                })}
              </div>

              <input
                className="w-full bg-gray-200/80 rounded-full py-3.5 px-5 text-gray-700 placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-violet-300 mb-7"
                inputMode="numeric"
                placeholder="₦ Other"
                type="text"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) setSelectedAmount("");
                }}
              />

              <div className="flex justify-center">
                <Button
                  className="w-1/2 min-w-[170px] bg-violet-500 text-white font-semibold py-6"
                  radius="full"
                  size="lg"
                  onPress={() => setStep("pay")}
                >
                  Donate
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-white px-8 pt-10 pb-8 hidden md:flex flex-col">
                <div className="text-center">
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Pay with Bank
                  </h2>
                  <p className="text-sm text-gray-500">
                    {PAYMENT_METHODS.join("  ·  ")}
                  </p>
                </div>
                <div className="mt-6 flex-1 flex items-end justify-center overflow-visible">
                  <img
                    alt="Pay with card"
                    className="w-[115%] max-w-none object-contain -ml-8 drop-shadow-2xl"
                    src="/images/donate-img.png"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#3a1d6e] to-[#6d28d9] p-8 lg:p-10 text-white flex flex-col">
                <h2 className="text-2xl font-bold mb-7">Bank Transfer</h2>
                <div className="space-y-6">
                  {ACCOUNTS.map((account) => (
                    <div
                      key={account.currency}
                      className="space-y-4 pb-5 border-b border-white/10 last:border-none last:pb-0"
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

                  <div>
                    <p className="text-sm font-medium text-white/60 mb-1">
                      Amount
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-white">
                        {amountLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center">
                  <Button
                    className="w-full max-w-xs bg-violet-500 text-white font-semibold py-6"
                    radius="full"
                    size="lg"
                    onPress={() => {
                      toast.success(
                        "Confirm your transfer to complete the donation",
                      );
                      reset();
                    }}
                  >
                    Make Payment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
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
    <p className="text-sm font-medium text-white/60 mb-1">{label}</p>
    <div className="flex items-center gap-3">
      <span className="text-lg font-semibold text-white">{value}</span>
      <button
        aria-label={`Copy ${label}`}
        className="text-white/60 hover:text-white transition-colors shrink-0"
        type="button"
        onClick={onCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  </div>
);
