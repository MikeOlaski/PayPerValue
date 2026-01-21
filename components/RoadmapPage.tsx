
import React from 'react';

const RoadmapPage: React.FC = () => {
  const roadmapData = [
    {
      version: "v0.1 - The Genesis (Current)",
      status: "COMPLETED",
      items: [
        "Gemini-Powered Valuation Engine (B2C)",
        "Marketplace Benchmark UI & Filtering",
        "B2B Partner Onboarding Flow",
        "Outcome Economy Resource Library",
        "Centralized Premium UI Framework"
      ],
      description: "Establishing the core identity and the 'Valuation Layer' prototype."
    },
    {
      version: "v0.3 - The Transaction Layer",
      status: "NEXT STEPS",
      items: [
        "Live Stripe Connect Integration (B2B)",
        "Customer-Determined Pricing (CDP) Bounds Engine",
        "Verified Invoice Generation (B2C)",
        "Persistent User Profiles & Valuation History",
        "API Sandbox for Platform Developers"
      ],
      description: "Moving from theory to actual capital movement based on outcome reports."
    },
    {
      version: "v0.6 - The Trust & Safety Protocol",
      status: "PLANNED",
      items: [
        "Proof-of-Outcome Verification Engine",
        "Agent Marketplace 'Verified ROI' Audit Program",
        "Dispute Resolution Mediator (Human-in-the-loop)",
        "Dynamic Valuation Feedback Flywheel",
        "Enterprise Dashboard for ROI Tracking"
      ],
      description: "Hardening the marketplace and ensuring valuation accuracy through real-world data."
    },
    {
      version: "v1.0 - The Standard for Value",
      status: "VISION",
      items: [
        "Headless 'Value-as-a-Service' API (VaaS)",
        "Global Outcome-Based Billing SDK",
        "Predictive Pricing Models for AI Fleets",
        "Seamless B2B2C Payment Routing",
        "Fully Autonomous Agent Negotiation Layer"
      ],
      description: "Becoming the global rail for how intelligence and outcomes are priced and paid for."
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto space-y-16">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full shadow-sm">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Product Roadmap</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
          Quantifying the <span className="text-blue-600">Future</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          From an MVP that defines value to a 1.0 infrastructure that standardizes it across the global economy.
        </p>
      </header>

      <div className="relative space-y-12 pb-20">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 -z-10"></div>

        {roadmapData.map((stage, idx) => (
          <div key={stage.version} className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Timeline Dot */}
            <div className={`absolute left-6 md:left-1/2 w-8 h-8 rounded-full border-4 border-white shadow-xl -translate-x-1/2 z-10 transition-colors ${stage.status === 'COMPLETED' ? 'bg-green-500' : stage.status === 'NEXT STEPS' ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`}></div>

            {/* Content Card */}
            <div className="ml-16 md:ml-0 md:w-1/2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">{stage.version}</h3>
                  <div className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${stage.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : stage.status === 'NEXT STEPS' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                    {stage.status}
                  </div>
                </div>
              </div>
              
              <p className="text-slate-900 font-black text-lg mb-4">{stage.description}</p>
              
              <ul className="space-y-3">
                {stage.items.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-500 font-medium group-hover:text-slate-800 transition-colors">
                    <span className={`mr-3 w-1.5 h-1.5 rounded-full ${stage.status === 'COMPLETED' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Label (Hidden on mobile) */}
            <div className="hidden md:block md:w-1/2 text-center">
               <span className="text-4xl font-black text-slate-50 opacity-10 select-none uppercase tracking-tighter">
                 Phase {idx + 1}
               </span>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black mb-6">The PM Vision for 1.0</h2>
            <p className="text-slate-400 leading-relaxed mb-6 font-medium">
              By version 1.0, PayPerValue moves from a calculator to the <strong>Autonomous Settlement Layer</strong>. We are building for a world where AI agents negotiate, perform, and settle invoices with each other and humans without friction.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-white">Trust as Infrastructure</h4>
                  <p className="text-xs text-slate-400">Verifying that the $10,000 value created was actually delivered before releasing funds.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-white">Universal Value SDK</h4>
                  <p className="text-xs text-slate-400">A drop-in component for any app to instantly enable 'Pay-for-Outcome' billing.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse absolute"></div>
            <div className="relative w-full aspect-square bg-white/5 rounded-[3rem] border border-white/10 p-8 flex items-center justify-center text-center">
              <div>
                <p className="text-5xl font-black mb-2">1.0</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Global Launch Target</p>
                <div className="mt-8 pt-8 border-t border-white/10">
                   <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-blue-400 font-bold hover:underline">Back to Alpha Test →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;
