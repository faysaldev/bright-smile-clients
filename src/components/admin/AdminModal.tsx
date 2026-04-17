"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function AdminModal({ isOpen, onClose, title, children, maxWidth = "max-w-5xl" }: AdminModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white animate-in slide-in-from-bottom-4 duration-300 flex flex-col">
      <div className="flex flex-shrink-0 items-center justify-between p-6 border-b border-slate-100 bg-white sticky top-0 z-20">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <button 
          type="button"
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 sm:p-10 overflow-y-auto flex-1 w-full max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
}
