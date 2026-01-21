
import React from 'react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-20">
      {/* Editorial Header */}
      <header className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full shadow-sm">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Industry Deep Dive</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
          The Rise of the <span className="text-blue-600">Outcome Economy</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          A definitive guide to the death of the hourly rate and the transition to value-aligned incentives in the age of intelligence.
        </p>
      </header>

      {/* Main Article Content */}
      <article className="max-w-4xl mx-auto space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">1. The Philosophical Shift</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            For decades, the "Billable Hour" has been the standard unit of economic exchange. However, as AI agents collapse the marginal cost of production, time is no longer a proxy for value. As <strong>Naval Ravikant</strong> famously stated, "Earn with your mind, not your time." In an economy where an AI can complete a week's worth of human labor in seconds, the only remaining objective metric for compensation is the <strong>Outcome</strong>.
          </p>
        </section>

        <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-6">Expert Consensus</h3>
          <blockquote className="text-2xl font-bold italic leading-relaxed mb-8">
            "The transition from selling a product or a service to selling an outcome is the most significant shift in business models since the Industrial Revolution."
          </blockquote>
          <p className="text-sm font-black uppercase tracking-widest text-slate-400">— Cited from Accenture Strategy: The Outcome Economy</p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900">2. Authoritative Sources & Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <h4 className="font-black text-blue-600 text-xs uppercase tracking-widest mb-4">Reddit Ecosystem</h4>
              <p className="font-bold text-slate-900 mb-2">r/SaaS & r/Entrepreneur</p>
              <p className="text-sm text-slate-500 leading-relaxed">The primary ground-floor discussion for pricing experiments. Search for "Value Based Pricing" threads to find thousands of real-world case studies on billing for outcomes.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <h4 className="font-black text-indigo-600 text-xs uppercase tracking-widest mb-4">Visualization & Logic</h4>
              <p className="font-bold text-slate-900 mb-2">Visualize Value (Jack Butcher)</p>
              <p className="text-sm text-slate-500 leading-relaxed">A masterclass in stripping away the complexity of "time-based" labor to focus on the high-leverage outcomes of design and thought leadership.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <h4 className="font-black text-violet-600 text-xs uppercase tracking-widest mb-4">Strategic Pricing</h4>
              <p className="font-bold text-slate-900 mb-2">The Futur (Chris Do)</p>
              <p className="text-sm text-slate-500 leading-relaxed">The most authoritative YouTube channel and educational group for creatives transitioning from $50/hr to $50,000 project-based outcomes.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <h4 className="font-black text-blue-600 text-xs uppercase tracking-widest mb-4">Data Verification</h4>
              <p className="font-bold text-slate-900 mb-2">ProfitWell (Patrick Campbell)</p>
              <p className="text-sm text-slate-500 leading-relaxed">The industry standard for SaaS pricing metrics. Their research on "Willingness to Pay" (WTP) is the bedrock of PayPerValue's valuation algorithms.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">3. Leading AI Agent Channels</h2>
          <div className="bg-blue-50 rounded-[2.5rem] p-10 border border-blue-100">
            <p className="text-slate-700 leading-relaxed mb-8">
              To stay at the cutting edge of how AI Agents are priced in the marketplace, we recommend following these specific profiles and developer groups who are building the infrastructure for autonomous billing:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">●</span>
                <span className="text-sm font-bold text-slate-900 underline cursor-pointer">Agentic AI Discord Communities:</span>
                <span className="text-sm text-slate-500">Focused on the deployment of LLM-based workers.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">●</span>
                <span className="text-sm font-bold text-slate-900 underline cursor-pointer">Stripe Engineering Blog:</span>
                <span className="text-sm text-slate-500">Essential reading for the technical implementation of Pay-as-you-go and Metered billing logic.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">●</span>
                <span className="text-sm font-bold text-slate-900 underline cursor-pointer">Ben's Bites & TLDR AI:</span>
                <span className="text-sm text-slate-500">Curated newsletters covering the commercialization of new AI models.</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="pt-20 border-t border-slate-100 flex flex-col items-center space-y-8">
           <h3 className="text-xl font-black text-slate-900 text-center">Ready to apply these concepts?</h3>
           <div className="flex space-x-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
              >
                Use the Valuation Agent
              </button>
           </div>
        </div>
      </article>
    </div>
  );
};

export default ResourcesPage;
