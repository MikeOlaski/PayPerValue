
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ValuationResult } from '../types';

interface ValuationChartProps {
  result: ValuationResult;
}

const ValuationChart: React.FC<ValuationChartProps> = ({ result }) => {
  const data = [
    { name: 'Min Fair', value: result.minFairValue, color: '#94a3b8' },
    { name: 'Recommended', value: result.recommendedValue, color: '#3b82f6' },
    { name: 'Premium', value: result.premiumValue, color: '#8b5cf6' },
  ];

  return (
    <div className="w-full h-64 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <h4 className="text-sm font-semibold text-slate-700 mb-4">Pricing Spectrum</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val}`} />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            formatter={(val: number) => [`$${val.toLocaleString()}`, 'Value']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ValuationChart;
