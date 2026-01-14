import {
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/modal";

export interface DailyWinnerData {
  username: string;
  points?: number;
  reward?: string;
  gameName?: string;
}

interface DailyWinnerPopupProps {
  winner: DailyWinnerData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DailyWinnerPopup = ({
  winner,
  isOpen,
  onClose,
}: DailyWinnerPopupProps) => {
  if (!winner) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      classNames={{
        backdrop: "bg-black/70",
        base: "border-0 bg-transparent shadow-none",
      }}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0">
            <div
              className="relative w-full max-w-[360px] mx-auto rounded-[20px] p-6 text-center overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #0e4b73, #06293f)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Confetti Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(#ffd700 2px, transparent 2px),
                    radial-gradient(#00d1ff 2px, transparent 2px),
                    radial-gradient(#ff6f00 2px, transparent 2px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Title */}
              <h2 className="relative text-white text-[22px] font-extrabold tracking-wide mb-1.5">
                🎉 CONGRATULATIONS!
              </h2>
              <p className="relative text-white text-sm opacity-90 mb-4">
                {winner.gameName || "Interview Quest"} – Daily Challenge Winner
              </p>

              {/* Winner Box */}
              <div className="relative bg-white text-[#0b3c5d] rounded-[14px] p-4 mb-4">
                <h3 className="text-lg font-bold mb-2.5 uppercase">
                  {winner.username}
                </h3>

                {winner.points !== undefined && (
                  <p className="text-sm my-1.5">
                    Points Earned:{" "}
                    <span className="font-bold">
                      {winner.points.toLocaleString()} pts ⭐
                    </span>
                  </p>
                )}

                {winner.reward && (
                  <p className="text-sm my-1.5">
                    Reward Won:{" "}
                    <span className="font-bold text-[#0a8f3c]">
                      {winner.reward}
                    </span>
                  </p>
                )}

                <div
                  className="mt-3 inline-block px-3.5 py-1.5 rounded-[20px] text-white text-[13px] font-bold"
                  style={{
                    background: "linear-gradient(135deg, #ff9800, #ff5722)",
                  }}
                >
                  Daily Winner
                </div>
              </div>

              {/* Mascot */}
              <div className="relative my-5">
                <img
                  src="/images/master-games.png"
                  alt="MAG Mascot"
                  className="w-[140px] h-auto mx-auto"
                />
              </div>

              {/* Footer */}
              <p className="relative text-white text-sm font-bold tracking-wide mt-2.5">
                PLAY IS POWER
              </p>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DailyWinnerPopup;
