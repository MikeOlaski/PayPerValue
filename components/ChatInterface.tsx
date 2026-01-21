
import React, { useState, useRef, useEffect } from 'react';
import { Message, ValuationResult } from '../types';
import { geminiService } from '../services/geminiService';
import ValuationChart from './ValuationChart';
import { ICONS } from '../constants';

const STARTER_PROMPTS = [
  { label: "SEO Article", text: "I wrote a 2,000-word technical article that now ranks #1 for 'SaaS security', driving 500 visitors/mo." },
  { label: "Bug Fix", text: "I fixed a production database leak that prevented an estimated 4 hours of platform downtime." },
  { label: "Sales Leads", text: "I generated 25 high-intent qualified leads for an enterprise software product this week." },
  { label: "Automation", text: "I built a Python script that automates weekly payroll reports, saving the HR team 8 hours every month." }
];

interface ChatInterfaceProps {
  initialAgent?: any;
  onClearContext?: () => void;
  onOpenWaitlist?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialAgent, onClearContext, onOpenWaitlist }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialAgent) {
      setIsModalOpen(true);
      const prompt = `I want to calculate the ROI for ${initialAgent.name}. We have a team of 15 and currently spend about $4,000/mo on these manual tasks. Can you show me the projected savings?`;
      setInput(prompt);
      handleSend(prompt);
    }
  }, [initialAgent]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isModalOpen]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    if (!isModalOpen) setIsModalOpen(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const isROIRequest = !!initialAgent || textToSend.toLowerCase().includes('roi') || textToSend.toLowerCase().includes('agent');
      
      let result: ValuationResult;
      if (isROIRequest) {
        const context = `
          AGENT DATA: ${JSON.stringify(initialAgent || { name: 'Generic Agent' })}
          USER INPUT: ${textToSend}
          CHAT HISTORY: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}
        `;
        result = await geminiService.getAgentValuation(context);
      } else {
        result = await geminiService.calculateValuation(
          `Previous context: ${messages.map(m => m.content).join("\n")}\nNew input: ${textToSend}`
        );
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.summary,
        valuation: result
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm having trouble connecting the dots on this one. Could you provide a bit more business context, like your current manual costs or task volume?"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClearContext) onClearContext();
  };

  const selectStarter = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Search Bar / Input Trigger */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onFocus={() => { if(messages.length > 0 || initialAgent) setIsModalOpen(true); }}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Calculate value for a task or AI agent..."
          className="w-full bg-white border-2 border-slate-100 rounded-full py-5 pl-14 pr-32 text-lg shadow-xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 text-slate-900 font-medium"
        />
        <div className="absolute inset-y-2 right-2 flex items-center space-x-2">
           <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="h-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 rounded-full font-bold text-sm transition-all flex items-center shadow-lg shadow-blue-100"
          >
            {isLoading ? '...' : 'Calculate'}
          </button>
        </div>
      </div>

      {/* Instructions & Starter Prompts */}
      <div className="text-center space-y-4">
        <p className="text-sm font-medium text-slate-500 italic">
          Try a template or describe your business challenge.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => selectStarter(prompt.text)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95"
            >
              + {prompt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-50 w-full max-w-5xl h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200/50 animate-in zoom-in-95 duration-300">
            {/* Modal Header - Refined */}
            <div className="px-10 py-8 bg-white border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-100">P</div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">PayPerValue Studio</h2>
                    {initialAgent && (
                      <span className="bg-blue-50 text-blue-600 text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border border-blue-100">
                        ROI Mode: {initialAgent.name}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">Economic Impact Engine</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 active:scale-90"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content / Chat Feed */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400 py-20">
                  <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl border border-slate-100 flex items-center justify-center mb-6">
                     <svg className="w-12 h-12 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                     </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">Ready to quantify impact?</h3>
                  <p className="max-w-xs text-slate-500 font-medium leading-relaxed">Add details about your project or business needs below to see the real economic numbers.</p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  {m.role === 'assistant' ? (
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 max-w-4xl w-full relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                       <div className="flex justify-between items-start mb-8">
                        <div className="w-full">
                          <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 flex items-center">
                            <span className="mr-3 text-lg">📈</span>
                            {initialAgent ? 'ROI PROJECTION' : 'VALUATION REPORT'}
                          </h3>
                          <div className="text-slate-800 font-medium text-lg leading-relaxed prose prose-slate max-w-none">
                            {m.content.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
                          </div>
                        </div>
                      </div>

                      {m.valuation && (
                        <div className="space-y-10 mt-10 border-t border-slate-50 pt-10">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            <ValuationChart result={m.valuation} />
                            
                            <div className="space-y-6">
                               <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-transform">
                                  <ICONS.Calculator className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-3">
                                    {initialAgent ? 'Projected Monthly Net Savings' : 'Recommended Fair Payment'}
                                  </p>
                                  <p className="text-5xl font-black">${m.valuation.recommendedValue.toLocaleString()}</p>
                                  <div className="mt-8 flex space-x-4">
                                    <button 
                                      onClick={onOpenWaitlist}
                                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                                    >
                                      {initialAgent ? 'Start Trial' : 'Generate Invoice'}
                                    </button>
                                    <button onClick={onOpenWaitlist} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl transition-all border border-white/10 active:scale-95">
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                {m.valuation.metrics.slice(0, 2).map((metric, idx) => (
                                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 group hover:border-blue-300 transition-all shadow-sm">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{metric.name}</p>
                                    <p className="text-xl font-black text-slate-900 mb-1">${metric.value.toLocaleString()}</p>
                                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{metric.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50/30 p-8 rounded-[2rem] border border-blue-100/50">
                            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                              <span className="w-5 h-5 mr-3"><svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg></span>
                              Calculation Rationale
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                              {m.valuation.reasoning.map((r, i) => (
                                <li key={i} className="text-xs text-slate-700 flex items-start leading-relaxed font-medium">
                                  <span className="text-blue-500 mr-3 flex-shrink-0 mt-1">▪</span>
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-blue-600 text-white px-8 py-5 rounded-[2rem] rounded-tr-none shadow-xl shadow-blue-500/10 max-w-lg font-medium text-lg leading-relaxed border border-white/10">
                      {m.content}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="flex items-center space-x-4 bg-white px-8 py-4 rounded-full shadow-xl border border-slate-100">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Generating Economic Insights</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer / Chat Input */}
            <div className="p-10 bg-white border-t border-slate-100 shrink-0">
              <div className="relative group flex items-center max-w-4xl mx-auto">
                <input 
                  autoFocus
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={initialAgent ? "Add your business variables (team size, volume)..." : "Ask about a different outcome or detail..."}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-7 pl-10 pr-40 text-lg shadow-inner focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-300 text-slate-900 font-medium"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-4 bg-slate-900 hover:bg-black disabled:opacity-50 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
