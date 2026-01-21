
import React, { useState, useMemo } from 'react';
import { ICONS } from '../constants';
import { ServiceType } from '../types';

const MARKETPLACE_AGENTS = [
  { id: '1', name: 'CodeGen Alpha', cat: 'Software', outcome: 'Boost Productivity', completion: 98.4, saved: 40, roi: 12.5, color: 'blue' },
  { id: '2', name: 'LegalDraft Pro', cat: 'Legal', outcome: 'Reduce Risk', completion: 94.2, saved: 15, roi: 8.2, color: 'indigo' },
  { id: '3', name: 'DataVista', cat: 'Analytics', outcome: 'Increase Revenue', completion: 99.1, saved: 60, roi: 22.4, color: 'violet' },
  { id: '4', name: 'RecruitBot AI', cat: 'HR Tech', outcome: 'Reduce Admin Costs', completion: 91.5, saved: 32, roi: 9.1, color: 'blue' },
  { id: '5', name: 'MarketMint', cat: 'Marketing', outcome: 'Client Engagement', completion: 88.9, saved: 24, roi: 15.6, color: 'indigo' },
  { id: '6', name: 'FinPulse', cat: 'Finance', outcome: 'Reduce Risk', completion: 99.8, saved: 85, roi: 35.2, color: 'violet' },
  { id: '7', name: 'SupportSentry', cat: 'CS', outcome: 'Personalize CX', completion: 96.2, saved: 120, roi: 18.4, color: 'blue' },
  { id: '8', name: 'DesignDynamo', cat: 'Design', outcome: 'Boost Productivity', completion: 92.4, saved: 18, roi: 6.5, color: 'indigo' },
  { id: '9', name: 'AuthGuard', cat: 'Security', outcome: 'Reduce Risk', completion: 99.9, saved: 45, roi: 42.1, color: 'violet' },
  { id: '10', name: 'SalesStream', cat: 'Sales', outcome: 'Sales Qualified Leads', completion: 89.4, saved: 55, roi: 19.8, color: 'blue' },
  { id: '11', name: 'ContentCure', cat: 'Content', outcome: 'Client Engagement', completion: 95.1, saved: 28, roi: 7.4, color: 'indigo' },
  { id: '12', name: 'DevOpsDash', cat: 'DevOps', outcome: 'Boost Productivity', completion: 97.6, saved: 72, roi: 28.3, color: 'violet' },
  { id: '13', name: 'HealthHeuristic', cat: 'Medical', outcome: 'Improve Accuracy', completion: 98.9, saved: 110, roi: 14.2, color: 'blue' },
  { id: '14', name: 'LogiLink', cat: 'Logistics', outcome: 'Reduce Admin Costs', completion: 94.5, saved: 95, roi: 21.6, color: 'indigo' },
  { id: '15', name: 'EduEngine', cat: 'EdTech', outcome: 'Personalize CX', completion: 93.1, saved: 22, roi: 11.2, color: 'violet' },
  { id: '16', name: 'CloudCaptain', cat: 'Infrastructure', outcome: 'Reduce Admin Costs', completion: 98.2, saved: 64, roi: 31.5, color: 'blue' },
  { id: '17', name: 'BioBatch', cat: 'Science', outcome: 'Improve Accuracy', completion: 99.4, saved: 200, roi: 48.9, color: 'indigo' },
  { id: '18', name: 'SecureSphere', cat: 'Cybersecurity', outcome: 'Reduce Risk', completion: 99.7, saved: 88, roi: 55.4, color: 'violet' }
];

interface MarketplaceProps {
  onStartROICalculation: (agent: any) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onStartROICalculation }) => {
  const [marketView, setMarketView] = useState<'agents' | 'types' | 'outcomes'>('agents');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [filterOutcome, setFilterOutcome] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'roi' | 'completion' | 'saved'>('roi');

  const categories = useMemo(() => ['all', ...Array.from(new Set(MARKETPLACE_AGENTS.map(a => a.cat)))], []);
  const outcomes = useMemo(() => ['all', ...Array.from(new Set(MARKETPLACE_AGENTS.map(a => a.outcome)))], []);

  const agentTypes = useMemo(() => {
    const groups: Record<string, any> = {};
    MARKETPLACE_AGENTS.forEach(agent => {
      if (!groups[agent.cat]) groups[agent.cat] = { name: agent.cat, count: 0, totalRoi: 0, totalCompletion: 0, totalSaved: 0 };
      groups[agent.cat].count++;
      groups[agent.cat].totalRoi += agent.roi;
      groups[agent.cat].totalCompletion += agent.completion;
      groups[agent.cat].totalSaved += agent.saved;
    });
    return Object.values(groups).map((g: any) => ({
      ...g,
      avgRoi: (g.totalRoi / g.count).toFixed(1),
      avgCompletion: (g.totalCompletion / g.count).toFixed(1),
      avgSaved: (g.totalSaved / g.count).toFixed(1)
    }));
  }, []);

  const agentOutcomes = useMemo(() => {
    const groups: Record<string, any> = {};
    MARKETPLACE_AGENTS.forEach(agent => {
      if (!groups[agent.outcome]) groups[agent.outcome] = { name: agent.outcome, count: 0, totalRoi: 0, totalCompletion: 0, totalSaved: 0 };
      groups[agent.outcome].count++;
      groups[agent.outcome].totalRoi += agent.roi;
      groups[agent.outcome].totalCompletion += agent.completion;
      groups[agent.outcome].totalSaved += agent.saved;
    });
    return Object.values(groups).map((g: any) => ({
      ...g,
      avgRoi: (g.totalRoi / g.count).toFixed(1),
      avgCompletion: (g.totalCompletion / g.count).toFixed(1),
      avgSaved: (g.totalSaved / g.count).toFixed(1)
    }));
  }, []);

  const filteredAgents = useMemo(() => {
    let result = [...MARKETPLACE_AGENTS];
    if (filterCat !== 'all') result = result.filter(a => a.cat === filterCat);
    if (filterOutcome !== 'all') result = result.filter(a => a.outcome === filterOutcome);
    result.sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
    return result;
  }, [filterCat, filterOutcome, sortBy]);

  return (
    <div className="space-y-8">
      {/* View Switcher */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex space-x-1">
          {(['agents', 'types', 'outcomes'] as const).map(view => (
            <button 
              key={view}
              onClick={() => setMarketView(view)}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all capitalize ${marketView === view ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Type</span>
            <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="bg-slate-100 border border-slate-200 text-slate-900 text-[11px] font-bold uppercase rounded-xl px-4 py-2 outline-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Outcome</span>
            <select value={filterOutcome} onChange={(e) => setFilterOutcome(e.target.value)} className="bg-slate-100 border border-slate-200 text-slate-900 text-[11px] font-bold uppercase rounded-xl px-4 py-2 outline-none">
              {outcomes.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-slate-100 border border-slate-200 text-slate-900 text-[11px] font-bold uppercase rounded-xl px-4 py-2 outline-none">
            <option value="roi">ROI (High-Low)</option>
            <option value="completion">Accuracy</option>
            <option value="saved">Time Saved</option>
          </select>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button onClick={() => setLayoutMode('grid')} className={`p-2 rounded-lg ${layoutMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            </button>
            <button onClick={() => setLayoutMode('table')} className={`p-2 rounded-lg ${layoutMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      {marketView === 'agents' && (
        layoutMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, i) => (
              <div key={agent.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 30}ms` }}>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <ICONS.Robot className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Verified ROI</span>
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{agent.outcome}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{agent.name}</h3>
                <p className="text-xs text-slate-400 mb-8 uppercase font-black tracking-widest">{agent.cat}</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[11px] mb-2 font-black uppercase tracking-wider text-slate-500">
                      <span>Accuracy</span>
                      <span className="text-slate-900">{agent.completion}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${agent.completion}%` }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Time Saved</p>
                      <p className="text-xl font-black text-slate-900">{agent.saved}h/mo</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Est. ROI</p>
                      <p className="text-xl font-black text-blue-600">{agent.roi}x</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onStartROICalculation(agent)}
                  className="w-full mt-10 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                  Calculate Your ROI
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Agent Name</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Outcome</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Accuracy</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">ROI Index</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAgents.map(agent => (
                  <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                          <ICONS.Robot className="w-5 h-5" />
                        </div>
                        <span className="font-black text-slate-900">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6"><span className="text-[10px] font-black uppercase bg-slate-100 px-3 py-1 rounded-full text-slate-500">{agent.cat}</span></td>
                    <td className="px-8 py-6"><span className="text-[10px] font-black uppercase text-blue-600">{agent.outcome}</span></td>
                    <td className="px-8 py-6"><span className="font-bold text-slate-900">{agent.completion}%</span></td>
                    <td className="px-8 py-6 font-black text-blue-600">{agent.roi}x</td>
                    <td className="px-8 py-6"><button onClick={() => onStartROICalculation(agent)} className="text-blue-600 font-black text-xs uppercase hover:underline">Calculate</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {marketView === 'types' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agentTypes.map((type: any) => (
            <div key={type.name} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all group animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><ICONS.Business className="w-8 h-8" /></div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Market Scale</p>
                  <p className="text-xl font-black text-slate-900">{type.count} Agent{type.count !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{type.name} Agents</h3>
              <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">Economic benchmarks for {type.name.toLowerCase()} automation and high-impact intelligence tasks.</p>
              <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div><p className="text-[10px] uppercase font-black text-slate-400 mb-1">Avg ROI</p><p className="text-2xl font-black text-blue-600">{type.avgRoi}x</p></div>
                <div><p className="text-[10px] uppercase font-black text-slate-400 mb-1">Avg Precision</p><p className="text-2xl font-black text-slate-900">{type.avgCompletion}%</p></div>
              </div>
              <button onClick={() => { setFilterCat(type.name); setMarketView('agents'); }} className="w-full mt-10 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center space-x-2">
                <span>View Reports</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {marketView === 'outcomes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agentOutcomes.map((outcome: any) => (
            <div key={outcome.name} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all group animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-violet-50 rounded-[1.5rem] flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all"><ICONS.Calculator className="w-8 h-8" /></div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Index Performance</p>
                  <p className="text-xl font-black text-slate-900">{outcome.count} Agent{outcome.count !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{outcome.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">Measured economic impact for agents specifically designed to {outcome.name.toLowerCase()}.</p>
              <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div><p className="text-[10px] uppercase font-black text-slate-400 mb-1">Yield Potential</p><p className="text-2xl font-black text-indigo-600">{outcome.avgRoi}x</p></div>
                <div><p className="text-[10px] uppercase font-black text-slate-400 mb-1">Time Return</p><p className="text-2xl font-black text-slate-900">{outcome.avgSaved}h</p></div>
              </div>
              <button onClick={() => { setFilterOutcome(outcome.name); setMarketView('agents'); }} className="w-full mt-10 bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-100">
                <span>Analyze Agents</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
