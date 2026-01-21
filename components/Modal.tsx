
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  maxWidth = 'max-w-2xl',
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`bg-white w-full ${maxWidth} rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] ${className}`}>
        {(title || subtitle) && (
          <div className="p-8 md:p-12 pb-0 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">{title}</h2>
              {subtitle && <p className="text-blue-600 font-bold text-sm mt-1">{subtitle}</p>}
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
