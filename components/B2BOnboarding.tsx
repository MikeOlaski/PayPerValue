
import React, { useState } from 'react';
import { B2BRegistration } from '../types';

interface B2BOnboardingProps {
  onOpenWaitlist: () => void;
}

const B2BOnboarding: React.FC<B2BOnboardingProps> = ({ onOpenWaitlist }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<B2BRegistration>({
    companyName: '',
    website: '',
    industry: '',
    expectedVolume: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Partner Registration</h2>
          <p className="text-slate-500 text-sm">Deploy PayPerValue to your platform</p>
        </div>
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === s ? 'bg-blue-600 text-white' : step > s ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-semibold text-slate-800">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
                <input 
                  type="text" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Acme Corp"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Website</label>
                <input 
                  type="text" 
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://acme.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Industry</label>
                <select 
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select industry</option>
                  <option value="saas">SaaS / Software</option>
                  <option value="agency">Service Agency</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="fintech">Fintech</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Expected Volume</label>
                <select 
                  name="expectedVolume"
                  value={formData.expectedVolume}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Monthly Transactions</option>
                  <option value="0-100">0 - 100</option>
                  <option value="100-1000">100 - 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
              </div>
            </div>
            <div className="pt-6">
              <button onClick={nextStep} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                Continue to Stripe Setup
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-semibold text-slate-800">Connect Payments</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600 italic">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Stripe Connect</h4>
                  <p className="text-sm text-slate-500">Securely route value-based payments to your account</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed">
                  We'll configure your Stripe instance to allow <strong>"Customer-Determined Pricing"</strong> within the bounds suggested by our AI agent.
                </p>
              </div>
              <button 
                onClick={onOpenWaitlist}
                className="w-full bg-[#635BFF] text-white py-3 rounded-xl font-bold hover:bg-[#534bb3] transition-all flex items-center justify-center space-x-2"
              >
                <span>Connect with Stripe</span>
                <span className="ml-2 text-[8px] font-black uppercase tracking-widest text-indigo-200 bg-white/10 px-1.5 py-0.5 rounded-md">Coming Soon</span>
              </button>
            </div>
            <div className="flex space-x-4 pt-6">
              <button onClick={prevStep} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">Back</button>
              <button onClick={nextStep} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Complete Setup</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-semibold text-slate-800">Integration Code</h3>
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <code className="text-pink-400 text-sm">
                  {`// Client-side initialization
const ppv = new PayPerValueAgent({
  apiKey: 'ppv_live_4839...abc',
  model: 'value-standard',
  theme: 'dark'
});

// Calculate and trigger checkout
ppv.on('service_rendered', async (context) => {
  const valuation = await ppv.calculate(context);
  ppv.triggerCheckout({
    suggestedAmount: valuation.recommended,
    minAmount: valuation.min
  });
});`}
                </code>
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <h4 className="text-xs font-bold text-indigo-800 uppercase mb-2">Technical Summary</h4>
                <ul className="text-xs text-indigo-700 space-y-2">
                  <li>• Webhooks configured for: <code className="bg-indigo-100 px-1 rounded">checkout.succeeded</code></li>
                  <li>• Value Model: <span className="font-bold">Conservative Outcome-Based</span></li>
                  <li>• Branding: <span className="font-bold">System Default</span></li>
                </ul>
              </div>
            </div>
            <div className="pt-6">
              <button 
                onClick={onOpenWaitlist}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center"
              >
                Go to Dashboard
                <span className="ml-2 text-[8px] font-black uppercase tracking-widest text-blue-100 bg-white/10 px-1.5 py-0.5 rounded-md">Coming Soon</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default B2BOnboarding;
