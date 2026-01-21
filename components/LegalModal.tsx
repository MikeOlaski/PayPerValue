
import React from 'react';
import Modal from './Modal';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'security';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How we protect your economic data.',
      body: (
        <div className="p-8 md:p-12 pt-0 space-y-6">
          <section>
            <h4 className="font-bold text-slate-900 mb-2">1. Data Collection</h4>
            <p className="text-slate-600 text-sm leading-relaxed">We collect information provided during valuation sessions to improve our algorithms. Personal information is only collected during waitlist sign-ups.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-900 mb-2">2. Usage of AI Models</h4>
            <p className="text-slate-600 text-sm leading-relaxed">Data sent to Gemini AI models is used for real-time inference. We do not use proprietary business outcomes to train public models.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-900 mb-2">3. Stripe Integration</h4>
            <p className="text-slate-600 text-sm leading-relaxed">We only access necessary permissions to suggest pricing and route payments. We never store credit card details.</p>
          </section>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Governing the outcome-based economy.',
      body: (
        <div className="p-8 md:p-12 pt-0 space-y-6">
          <section>
            <h4 className="font-bold text-slate-900 mb-2">1. Acceptance of Terms</h4>
            <p className="text-slate-600 text-sm leading-relaxed">By using PayPerValue, you agree that valuations are recommendations and not financial advice.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-900 mb-2">2. Use of Valuations</h4>
            <p className="text-slate-600 text-sm leading-relaxed">Users are responsible for final pricing decisions. We are not liable for disputes between providers and clients.</p>
          </section>
        </div>
      )
    },
    security: {
      title: 'Security Standards',
      subtitle: 'Enterprise-grade protection.',
      body: (
        <div className="p-8 md:p-12 pt-0 space-y-6">
          <section>
            <h4 className="font-bold text-slate-900 mb-2">1. Encryption</h4>
            <p className="text-slate-600 text-sm leading-relaxed">All data in transit is protected by TLS 1.3. Data at rest is encrypted using AES-256 standards.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-900 mb-2">2. Compliance</h4>
            <p className="text-slate-600 text-sm leading-relaxed">We adhere to SOC2 Type II principles and GDPR requirements for all users.</p>
          </section>
        </div>
      )
    }
  }[type];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={content.title} 
      subtitle={content.subtitle}
      maxWidth="max-w-2xl"
    >
      <div className="custom-scrollbar">
        {content.body}
      </div>
      <div className="p-8 pt-0 mt-4 border-t border-slate-50">
        <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">Close</button>
      </div>
    </Modal>
  );
};

export default LegalModal;
