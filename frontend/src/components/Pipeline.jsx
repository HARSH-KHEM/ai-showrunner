import { useEffect, useRef } from 'react';

export default function Pipeline({ isVisible, overallProgress, agentStates, logs }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isVisible) return null;

  return (
    <section className="py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/80 border-y border-outline-variant/30 transition-all duration-700" id="pipeline">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              <span className="font-terminal-sm text-terminal-sm text-red-600 font-bold uppercase tracking-widest">Live Production Engine</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg">AI AGENT CLUSTER ACTIVE</h2>
          </div>
          <div className="text-right">
            <span className="font-terminal-sm text-terminal-sm text-primary mb-2 block">{Math.round(overallProgress)}% COMPLETE</span>
            <div className="w-48 h-1 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full production-gradient transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {agentStates.map((agent, i) => {
            const isComplete = agent.status === 'COMPLETE';
            const isActive = agent.status === 'ACTIVE';
            return (
              <div key={agent.id} className="bg-black/40 border border-outline-variant/40 p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">AGENT 0{i + 1}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded text-white ${isActive ? 'bg-primary-container animate-pulse' : isComplete ? 'bg-green-600' : 'bg-surface-container-high'}`}>
                    {agent.status}
                  </span>
                </div>
                <h3 className="font-label-caps text-sm tracking-widest text-primary">{agent.name}</h3>
                <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${agent.progress}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 relative">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg h-64 overflow-hidden scanline-overlay font-terminal-sm text-terminal-sm p-4 text-amber-500">
              <div className="space-y-1 h-full overflow-y-auto pb-4" ref={terminalRef}>
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4 animate-in fade-in duration-300">
                    <span className="flex-shrink-0 text-white/40">[{log.timestamp}]</span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-black/60 border border-outline-variant p-6 rounded-lg flex flex-col justify-center items-center text-center space-y-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="60" stroke="currentColor" strokeWidth="4"></circle>
                <circle 
                  className="text-primary transition-all duration-300" 
                  cx="64" cy="64" fill="transparent" r="60" 
                  stroke="currentColor" 
                  strokeDasharray="377" 
                  strokeDashoffset={377 - (overallProgress / 100) * 377} 
                  strokeWidth="4"
                ></circle>
              </svg>
              <span className="absolute font-headline-lg text-2xl">{Math.round(overallProgress)}%</span>
            </div>
            <p className="font-label-caps text-xs tracking-widest opacity-60 uppercase">System Latency: 24ms</p>
          </div>
        </div>
      </div>
    </section>
  );
}
