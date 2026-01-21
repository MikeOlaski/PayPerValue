
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ValuationResult } from '../types';
import ValuationChart from './ValuationChart';
import { ICONS } from '../constants';

interface BusinessValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessValuationModal: React.FC<BusinessValuationModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !valuation) {
      calculateBusinessValue();
    }
  }, [isOpen]);

  const calculateBusinessValue = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `
        Value the business "PayPerValue.com". 
        CONTEXT: 
        - PayPerValue.com is a first-mover platform in the outcome-based economy.
        - Three Core Business Models: 
          1. Consumer Valuation (B2C tool to quantify any work impact).
          2. B2B Platform (SaaS integration for Stripe allowing PWYW outcome pricing).
          3. AI Agent Marketplace (Index/Benchmark of agent ROI/accuracy).
        - Market Potential: Global shift to value-delivered billing, accelerated by AI agents.
        - Timeline: 10-year growth horizon.
        - Assets: Premium "PayPerValue.com" domain, proprietary valuation algorithms, 2,400+ person waitlist.
        
        Calculate current minimum valuation, recommended enterprise value, and a 10-year premium exit value.
      `;
      const result = await geminiService.calculateValuation(prompt);
      setValuation(result);
    } catch (err) {
      console.error("Valuation calculation failed:", err);
      setError("The valuation engine encountered an error. This usually happens if the API key is missing or the model timed out.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[85vh] animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100">P</div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">Enterprise <span className="text-indigo-600">Valuation</span></h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PayPerValue.com Acquisition Logic</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                  <ICONS.Calculator className="w-8 h-8 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-slate-900">Quantifying the Outcome Economy...</p>
                <p className="text-slate-500 font-medium">Analyzing market shifts and 10-year growth multipliers.</p>
              </div>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
               <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 max-w-md mx-auto">{error}</h3>
              <p className="text-slate-500 max-w-sm mx-auto">This often happens if the Google Gemini API key isn't active or the response was interrupted.</p>
              <button onClick={calculateBusinessValue} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Retry Analysis</button>
            </div>
          ) : valuation ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10">
              {/* Summary Hero */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0">
                  <ICONS.Business className="w-64 h-64" />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">M&A Strategy Report</h3>
                  <div className="text-2xl md:text-3xl font-bold leading-relaxed mb-8">
                    {valuation.summary}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset Value</p>
                      <p className="text-3xl font-black text-white">${valuation.minFairValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Ent. Valuation</p>
                      <p className="text-4xl font-black text-white">${valuation.recommendedValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-1">10Y Premium</p>
                      <p className="text-3xl font-black text-white">${valuation.premiumValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Valuation Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {valuation.metrics.map((m, i) => (
                      <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">{m.name}</p>
                        <p className="text-2xl font-black text-slate-900 mb-1">${m.value.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Economic Outlook</h4>
                  <ValuationChart result={valuation} />
                </div>
              </div>

              {/* Reasoning / Rationale */}
              <div className="bg-indigo-50/50 p-10 rounded-[2.5rem] border border-indigo-100">
                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center">
                  <span className="mr-3">🧠</span>
                  Investment Rationale
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {valuation.reasoning.map((r, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed italic">"{r}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-10 border-t border-slate-50 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-medium max-w-sm text-center md:text-left">
            This valuation reflects the projected growth of the outcome-based economy and premium domain acquisition premiums.
          </p>
          <div className="flex space-x-4">
             <button onClick={onClose} className="px-8 py-4 rounded-2xl font-black text-slate-600 border border-slate-100 hover:bg-slate-50 transition-all">Close Analysis</button>
             <button onClick={() => window.print()} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Download PDF Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessValuationModal;
