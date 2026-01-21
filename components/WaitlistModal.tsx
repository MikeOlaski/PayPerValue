
import React, { useState } from 'react';
import Modal from './Modal';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
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
      title={!submitted ? <>Join the outcome <br/><span className="text-blue-600">economy.</span></> : undefined}
      subtitle={!submitted ? "Be the first to access our enterprise valuation suite." : undefined}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="p-8 md:p-12 pt-0 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <input required type="text" placeholder="Jane Doe" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
            <input required type="email" placeholder="jane@company.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">I am a...</label>
            <select required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
              <option value="">Select your role</option>
              <option value="freelancer">Freelancer / Consultant</option>
              <option value="business">Business Owner / Exec</option>
              <option value="developer">AI Agent Developer</option>
              <option value="platform">Platform / SaaS Manager</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all disabled:opacity-50 mt-4">
            {loading ? 'Securing your spot...' : 'Secure Early Access'}
          </button>
          <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest">Joining 2,400+ pioneers.</p>
        </form>
      ) : (
        <div className="p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900">You're on the list!</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">We'll reach out to your work email shortly with your exclusive invitation to the beta.</p>
          <button onClick={onClose} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all">Close</button>
        </div>
      )}
    </Modal>
  );
};

export default WaitlistModal;
