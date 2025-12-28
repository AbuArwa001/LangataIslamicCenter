"use client";

import { useState } from "react";
import { X } from "lucide-react";
import DonationForm from "./DonationForm";

interface DonationModalProps {
  projectId: string;
  projectName: string;
  trigger: React.ReactNode;
}

export default function DonationModal({
  projectId,
  projectName,
  trigger,
}: DonationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div onClick={openModal} className="w-full cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <DonationForm projectId={projectId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
