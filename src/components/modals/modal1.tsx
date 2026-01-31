'use client';

import  { useEffect } from 'react';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  continuee: () => void;
  text: string;
  success?: boolean;
}

const Modal_ = ({
  modalVisible,
  setModalVisible,
  continuee,
  text,
  success = true,
}: ModalProps) => {
  // Auto-close and continue after showing modal
  useEffect(() => {
    if (modalVisible && success) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        continuee();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible, success, setModalVisible, continuee]);

  if (!modalVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 
                 animate-fadeIn"
      onClick={() => setModalVisible(false)}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl 
                   transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          {success ? (
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Message */}
        <p className="text-center text-lg font-semibold text-gray-800 mb-6">
          {text}
        </p>

        {/* Continue Button */}
        <button
          onClick={() => {
            setModalVisible(false);
            continuee();
          }}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg 
                   font-medium hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>

      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Modal_;