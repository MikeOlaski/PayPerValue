
import React, { useState } from 'react';
import Modal from './Modal';

interface ListAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListAgentModal: React.FC<ListAgentModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-2xl"
      title={!submitted ? <>List your agent on the <br/><span className="text-violet-600">Value Index.</span></> : undefined}
      subtitle={!submitted ? "Join the benchmark for the intelligence economy." : undefined}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="p-8 md:p-12 pt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Agent Name</label>
              <input required type="text" placeholder="e.g. CodeGen Alpha" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-violet-500 outline-none transition-all text-slate-900 font-medium" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-violet-500 outline-none appearance-none">
                <option value="">Select Domain</option>
                <option value="dev">Software Engineering</option>
                <option value="legal">Legal & Compliance</option>
                <option value="finance">Finance & Fintech</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Agent Website / API Docs</label>
            <input required type="url" placeholder="https://agent.ai/docs" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Value Prop</label>
            <textarea required rows={3} placeholder="Describe the outcome-based value..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none resize-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-violet-100 transition-all disabled:opacity-50">
            {loading ? 'Submitting Agent Details...' : 'Submit Agent for Review'}
          </button>
          <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-[0.1em]">Verified agents get access to Value-Share SDK.</p>
        </form>
      ) : (
        <div className="p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-12 h-12 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Agent Received!</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">Our economic team will evaluate your agent's ROI metrics within 48 hours.</p>
          <button onClick={onClose} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all">Continue Browsing</button>
        </div>
      )}
    </Modal>
  );
};

export default ListAgentModal;
