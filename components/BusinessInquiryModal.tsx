
import React, { useState } from 'react';
import Modal from './Modal';

interface BusinessInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenValuation: () => void;
}

const BusinessInquiryModal: React.FC<BusinessInquiryModalProps> = ({ isOpen, onClose, onOpenValuation }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-lg"
      title={!submitted ? <>Business <span className="text-indigo-600">Inquiries.</span></> : undefined}
      subtitle={!submitted ? "Let's discuss enterprise integrations and custom models." : undefined}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="p-8 md:p-12 pt-0 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <input required type="text" placeholder="Alex Reed" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input required type="email" placeholder="alex@company.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
            <textarea required rows={4} placeholder="How can we help your business scale?" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl transition-all disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Inquiry'}
          </button>
          <div className="mt-6 text-center">
            <button type="button" onClick={() => { onClose(); onOpenValuation(); }} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              Want to buy this business?
            </button>
          </div>
        </form>
      ) : (
        <div className="p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Message Sent.</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">Our partnership team will follow up within 24 business hours.</p>
          <button onClick={onClose} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all">Back to Site</button>
        </div>
      )}
    </Modal>
  );
};

export default BusinessInquiryModal;
