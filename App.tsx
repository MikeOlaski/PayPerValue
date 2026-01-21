
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import B2BOnboarding from './components/B2BOnboarding';
import Marketplace from './components/Marketplace';
import HeadlineCycler from './components/HeadlineCycler';
import WaitlistModal from './components/WaitlistModal';
import ListAgentModal from './components/ListAgentModal';
import BusinessInquiryModal from './components/BusinessInquiryModal';
import BusinessValuationModal from './components/BusinessValuationModal';
import LegalModal from './components/LegalModal';
import ResourcesPage from './components/ResourcesPage';
import RoadmapPage from './components/RoadmapPage';
import StartupDossier from './components/StartupDossier';
import { ServiceType } from './types';
import { APP_NAME } from './constants';

const ComingSoonBadge = () => (
  <span className="ml-2 text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md align-middle whitespace-nowrap">
    Coming Soon
  </span>
);

const ConsumerHero = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-8">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pricing Intelligence Active</span>
    </div>
    <HeadlineCycler />
    <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
      Stop guessing what's fair. Our AI analyzes deliverables and outcomes to provide objective, data-driven payment recommendations.
    </p>
  </div>
);

const B2BHero = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full shadow-sm mb-8">
      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">For Platforms & SaaS</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
      Stop leaving <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">money</span> on the table.
    </h1>
    <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
      Align revenue with the value you deliver. Move to high-margin, outcome-based pricing that scales with your results.
    </p>
    <div className="flex justify-center space-x-4">
      <button onClick={onOpenWaitlist} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
        Start Integration
      </button>
      <button onClick={onOpenWaitlist} className="bg-white border-2 border-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center">
        View API Docs <ComingSoonBadge />
      </button>
    </div>
  </div>
);

const MarketplaceHero = ({ onOpenListModal }: { onOpenListModal: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-flex items-center space-x-2 bg-violet-50 border border-violet-100 px-4 py-1.5 rounded-full shadow-sm mb-8">
      <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest">The Intelligence Index</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
      Benchmark your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">economic</span> ROI.
    </h1>
    <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
      Compare agents by verified outcomes and ROI. Build a high-impact intelligence stack using definitive benchmarks.
    </p>
    <button onClick={onOpenListModal} className="bg-white border-2 border-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95">
      List Your Agent
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceType>(ServiceType.CONSUMER);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isListAgentOpen, setIsListAgentOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'security' | null>(null);
  const [roiContext, setRoiContext] = useState<any>(null);

  const startROICalculation = (agent: any) => {
    setRoiContext(agent);
    setActiveTab(ServiceType.CONSUMER);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { type: ServiceType.CONSUMER, label: 'Consumer' },
    { type: ServiceType.B2B, label: 'Business' },
    { type: ServiceType.MARKETPLACE, label: 'Marketplace' },
  ];

  return (
    <div className="min-h-full flex flex-col selection:bg-blue-100 bg-white">
      {/* Modals */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <ListAgentModal isOpen={isListAgentOpen} onClose={() => setIsListAgentOpen(false)} />
      <BusinessInquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        onOpenValuation={() => setIsValuationModalOpen(true)}
      />
      <BusinessValuationModal 
        isOpen={isValuationModalOpen} 
        onClose={() => setIsValuationModalOpen(false)} 
      />
      <LegalModal 
        isOpen={!!legalType} 
        onClose={() => setLegalType(null)} 
        type={legalType || 'privacy'} 
      />

      {/* Floating Action Button */}
      <button 
        onClick={() => { setActiveTab(ServiceType.CONSUMER); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="fixed bottom-8 right-8 z-[150] w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.6)] hover:scale-110 active:scale-95 transition-all group overflow-hidden border-2 border-white/20"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
      </button>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => { setActiveTab(ServiceType.CONSUMER); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">P</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">{APP_NAME}</span>
          </div>
          
          <nav className="hidden md:flex items-center bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
            {navItems.map(item => (
              <button 
                key={item.type}
                onClick={() => setActiveTab(item.type)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === item.type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <button onClick={() => setIsWaitlistOpen(true)} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center group">
              Sign In <ComingSoonBadge />
            </button>
            <button onClick={() => setIsWaitlistOpen(true)} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <section className="bg-white pt-20 pb-12 overflow-hidden relative border-b border-slate-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          {activeTab === ServiceType.CONSUMER && (
            <>
              <ConsumerHero />
              <ChatInterface 
                initialAgent={roiContext} 
                onClearContext={() => setRoiContext(null)} 
                onOpenWaitlist={() => setIsWaitlistOpen(true)} 
              />
            </>
          )}
          {activeTab === ServiceType.B2B && <B2BHero onOpenWaitlist={() => setIsWaitlistOpen(true)} />}
          {activeTab === ServiceType.MARKETPLACE && <MarketplaceHero onOpenListModal={() => setIsListAgentOpen(true)} />}
          {activeTab === ServiceType.RESOURCES && <ResourcesPage />}
          {activeTab === ServiceType.ROADMAP && <RoadmapPage />}
          {activeTab === ServiceType.DOSSIER && <StartupDossier />}
        </div>
      </section>

      {/* Primary Display Area */}
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 py-16">
          {activeTab === ServiceType.B2B && <B2BOnboarding onOpenWaitlist={() => setIsWaitlistOpen(true)} />}
          {activeTab === ServiceType.MARKETPLACE && <Marketplace onStartROICalculation={startROICalculation} />}
        </div>
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-24 px-4 relative mt-auto">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8 group cursor-pointer" onClick={() => { setActiveTab(ServiceType.CONSUMER); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200 transition-transform group-hover:scale-105">P</div>
              <span className="text-2xl font-black tracking-tight text-slate-900">PayPerValue</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed font-medium text-lg">
              Building the core infrastructure for the outcome-based economy. Reward value, quantify impact, and align incentives globally.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[11px] uppercase tracking-[0.2em] text-slate-400">Ecosystem</h4>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li onClick={() => setActiveTab(ServiceType.DOSSIER)} className="hover:text-blue-600 transition-colors cursor-pointer group flex items-center">
                Startup Dossier <span className="ml-2 text-[8px] opacity-0 group-hover:opacity-100 transition-all">→</span>
              </li>
              <li onClick={() => setActiveTab(ServiceType.ROADMAP)} className="hover:text-blue-600 transition-colors cursor-pointer group flex items-center">
                Vision & Roadmap <span className="ml-2 text-[8px] opacity-0 group-hover:opacity-100 transition-all">→</span>
              </li>
              <li onClick={() => setActiveTab(ServiceType.RESOURCES)} className="hover:text-blue-600 transition-colors cursor-pointer group flex items-center">
                Resources & Insight <span className="ml-2 text-[8px] opacity-0 group-hover:opacity-100 transition-all">→</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[11px] uppercase tracking-[0.2em] text-slate-400">Resources</h4>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li className="flex items-center text-slate-400 cursor-not-allowed">
                The Valuation API <ComingSoonBadge />
              </li>
              <li className="flex items-center text-slate-400 cursor-not-allowed">
                Stripe Connect Guide <ComingSoonBadge />
              </li>
              <li onClick={() => setActiveTab(ServiceType.RESOURCES)} className="hover:text-blue-600 transition-colors cursor-pointer">
                Ethical AI Pricing
              </li>
              <li onClick={() => setIsInquiryOpen(true)} className="hover:text-blue-600 transition-colors cursor-pointer">
                Business Inquiries
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[11px] uppercase tracking-[0.2em] text-slate-400">Company</h4>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li className="hover:text-blue-600 transition-colors cursor-pointer">X / Twitter</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">GitHub</li>
              <li onClick={() => setLegalType('privacy')} className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Framework</li>
              <li onClick={() => setLegalType('terms')} className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] gap-4">
          <p>© 2024 PayPerValue Labs. Quantifying the future of work.</p>
          <div className="flex space-x-8">
            <span onClick={() => setLegalType('privacy')} className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</span>
            <span onClick={() => setLegalType('terms')} className="hover:text-blue-600 cursor-pointer transition-colors">Terms</span>
            <span onClick={() => setLegalType('security')} className="hover:text-blue-600 cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
