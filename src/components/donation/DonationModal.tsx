"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on the client
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Donate to {projectName}</h3>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 text-gray-500 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <DonationForm projectId={projectId} />
        </div>

        {/* Footer with Cancel Button */}
        <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={closeModal}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div onClick={openModal} className="w-full cursor-pointer">
        {trigger}
      </div>

      {/* Render via Portal to body to solve z-index/navbar issues */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}