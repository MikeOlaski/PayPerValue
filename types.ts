
export enum ServiceType {
  CONSUMER = 'consumer',
  B2B = 'b2b',
  MARKETPLACE = 'marketplace',
  RESOURCES = 'resources',
  ROADMAP = 'roadmap',
  DOSSIER = 'dossier'
}

export interface ValuationMetric {
  name: string;
  value: number;
  description: string;
}

export interface ValuationResult {
  summary: string;
  minFairValue: number;
  recommendedValue: number;
  premiumValue: number;
  reasoning: string[];
  metrics: ValuationMetric[];
}

export interface B2BRegistration {
  companyName: string;
  website: string;
  industry: string;
  expectedVolume: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  valuation?: ValuationResult;
}

export interface AgentMetric {
  id: string;
  name: string;
  completionRate: number;
  timeSavings: number;
  accuracy: number;
  roi: number;
}
