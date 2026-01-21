
import React from 'react';

const StartupDossier: React.FC = () => {
  const documents = [
    {
      title: "Executive Summary",
      id: "exec-summary",
      icon: "📄",
      content: `PayPerValue is the foundational economic layer for the Outcome Economy. In an age where AI reduces the marginal cost of production toward zero, traditional time-based billing is failing. We provide the infrastructure to quantify and transact based on verified value delivered. Our platform enables service providers, SaaS platforms, and AI Agent labs to move from 'Cost-Plus' to 'Value-Share' revenue models.`
    },
    {
      title: "Product Brief",
      id: "product-brief",
      icon: "🛠️",
      content: `Our core product is a Gemini-powered 'Economic Impact Engine' available via a Studio UI and a headless API. It translates qualitative work descriptions into quantitative financial reports. Key features include an automated valuation agent, a B2B Stripe Connect integration for 'Customer-Determined Pricing' (CDP), and the 'Intelligence Index'—the world's first ROI-verified marketplace for AI Agents.`
    },
    {
      title: "Market Brief",
      id: "market-brief",
      icon: "🌍",
      content: `We target the $4 Trillion professional services industry (consulting, legal, creative) and the exploding $200B+ AI Agent market. As manual tasks become automated, these markets are desperate for a new pricing standard. We position ourselves as the 'Nielsen Rating' for agent performance and the 'Stripe' for value-based payouts.`
    },
    {
      title: "Financial Brief",
      id: "financial-brief",
      icon: "💰",
      content: `Our revenue model is a 'Value-Share' take rate. We take 1-2% of the value-surplus transacted through our CDP checkout. Additionally, we offer enterprise API licensing for high-volume platforms and 'Verified ROI' listing fees for the Intelligence Index. This aligns our success directly with the wealth we help our users capture.`
    },
    {
      title: "Mission Statement",
      id: "mission",
      icon: "🎯",
      content: `To build a more equitable global economy where human and artificial intelligence are rewarded proportionally to the impact they create. We believe that by decoupling income from time, we unlock a world of high-leverage work and universal economic transparency.`
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto space-y-16 py-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full shadow-sm">
          <span className="text-[10px] font-black text-slate-100 uppercase tracking-widest">Internal Dossier v1.0</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
          Startup <span className="text-blue-600">Dossier</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          The core strategic documentation defining the mission, mechanics, and market position of PayPerValue.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {documents.map((doc) => (
          <section 
            key={doc.id} 
            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                {doc.icon}
              </div>
              <h2 className="text-2xl font-black text-slate-900">{doc.title}</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium flex-1">
              {doc.content}
            </p>
            <div className="mt-8 pt-6 border-t border-slate-50">
               <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                 Download Full PDF →
               </button>
            </div>
          </section>
        ))}
      </div>

      <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h3 className="text-2xl font-black text-slate-900">Founding Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-black text-blue-600 mb-2">01</p>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Results First</p>
              <p className="text-xs text-slate-500 leading-relaxed">We optimize for outcomes, never for activity.</p>
            </div>
            <div>
              <p className="text-3xl font-black text-indigo-600 mb-2">02</p>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Radical Clarity</p>
              <p className="text-xs text-slate-500 leading-relaxed">Financial transparency through data-driven logic.</p>
            </div>
            <div>
              <p className="text-3xl font-black text-violet-600 mb-2">03</p>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">AI Alignment</p>
              <p className="text-xs text-slate-500 leading-relaxed">Building the rails for AI to be a productive agent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDossier;
