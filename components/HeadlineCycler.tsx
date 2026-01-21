
import React, { useState, useEffect, useMemo } from 'react';

const CONSUMER_HEADLINES = [
  "Know the true worth of the work you receive.",
  "Stop guessing. Start valuing outcomes.",
  "Objective pricing for any service.",
  "Pay for the results, not just the time.",
  "Clarity on the impact you paid for.",
  "A fair price for every delivery.",
  "Measure the value, then settle the bill.",
  "The data-driven way to pay fairly.",
  "Turn results into clear dollar amounts.",
  "Transparency for every transaction."
];

const HeadlineCycler: React.FC = () => {
  const randomizedHeadlines = useMemo(() => [...CONSUMER_HEADLINES].sort(() => Math.random() - 0.5), []);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % randomizedHeadlines.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [randomizedHeadlines]);

  return (
    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight min-h-[3em] flex items-center justify-center text-center">
      <span className={`transition-all duration-500 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 px-2`}>
        {randomizedHeadlines[index]}
      </span>
    </h1>
  );
};

export default HeadlineCycler;
