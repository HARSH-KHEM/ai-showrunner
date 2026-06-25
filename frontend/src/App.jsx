import { useState, useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import TopNavBar from './components/TopNavBar';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import Pipeline from './components/Pipeline';
import Completed from './components/Completed';

const INITIAL_AGENTS = [
  { id: 'agent-1', name: 'SCRIPT WRITER', status: 'STANDBY', progress: 0 },
  { id: 'agent-2', name: 'STORYBOARD DIRECTOR', status: 'STANDBY', progress: 0 },
  { id: 'agent-3', name: 'CONTINUITY SUPERVISOR', status: 'STANDBY', progress: 0 },
  { id: 'agent-4', name: 'VIDEO GENERATOR', status: 'STANDBY', progress: 0 },
  { id: 'agent-5', name: 'FILM EDITOR', status: 'STANDBY', progress: 0 }
];

function App() {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const [overallProgress, setOverallProgress] = useState(0);
  const [agentStates, setAgentStates] = useState(INITIAL_AGENTS);
  const [logs, setLogs] = useState([]);

  const [videoSrc, setVideoSrc] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('bg-black/80');
        } else {
          nav.classList.remove('bg-black/80');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { timestamp, message }]);
  };

  const startProduction = () => {
    if (!prompt) {
      alert("Please enter a story prompt first.");
      return;
    }

    setIsGenerating(true);
    setIsComplete(false);
    setOverallProgress(0);
    setAgentStates(INITIAL_AGENTS);
    setVideoSrc(null);
    setErrorMsg(null);
    setLogs([{ timestamp: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }), message: "INITIALIZING PRODUCTION ENGINE..." }]);

    setTimeout(() => {
      document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    const eventSource = new EventSource(`http://localhost:8001/generate/stream?topic=${encodeURIComponent(prompt)}`);

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        
        const stepMap = {
          'script': 0,
          'storyboard': 1,
          'continuity': 2,
          'video_start': 3,
          'video_progress': 3,
          'editing': 4
        };

        const agentIdx = stepMap[data.step];
        
        if (data.message) {
          addLog(data.message);
        }

        if (agentIdx !== undefined) {
          setAgentStates(prev => {
            const next = [...prev];
            for (let i = 0; i < agentIdx; i++) {
              next[i] = { ...next[i], status: 'COMPLETE', progress: 100 };
            }
            next[agentIdx] = {
              ...next[agentIdx],
              status: data.status === 'error' ? 'ERROR' : 'ACTIVE',
              progress: 50 // Mocking individual agent progress while active
            };
            return next;
          });
        }

        if (data.progress !== undefined) {
          setOverallProgress(data.progress);
        }

        if (data.progress === 100 || data.step === 'done') {
          if (data.video_url) {
            setVideoSrc(data.video_url);
          }
          eventSource.close();
          setAgentStates(prev => prev.map(a => ({ ...a, status: 'COMPLETE', progress: 100 })));
          finishProduction();
        }
      } catch (err) {
        console.error("Failed to parse SSE message", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      setErrorMsg("Connection lost, retrying...");
      addLog("ERROR: Connection to production engine lost.");
      eventSource.close();
    };
  };

  const finishProduction = () => {
    setIsComplete(true);
    setTimeout(() => {
      document.getElementById('completed-section')?.scrollIntoView({ behavior: 'smooth' });
      // Trigger Confetti
      if (window.confetti) {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
          window.confetti({
              particleCount: 3,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#e50914', '#ffb95f']
          });
          window.confetti({
              particleCount: 3,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#e50914', '#ffb95f']
          });

          if (Date.now() < end) {
              requestAnimationFrame(frame);
          }
        }());
      }
    }, 300);
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      <ShaderBackground />
      <TopNavBar />
      
      <main className="relative z-10 pt-16">
        <Hero />
        
        <InputSection 
          prompt={prompt} 
          setPrompt={setPrompt}
          genre={genre}
          setGenre={setGenre}
          onStart={startProduction}
          isGenerating={isGenerating}
        />
        
        <Pipeline 
          isVisible={isGenerating && !isComplete}
          overallProgress={overallProgress}
          agentStates={agentStates}
          logs={logs}
        />

        <Completed isVisible={isComplete} videoSrc={videoSrc} />
      </main>

      {errorMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-red-900 border border-red-500 text-white px-6 py-3 rounded shadow-lg flex items-center gap-4">
          <span>{errorMsg}</span>
          <button 
            onClick={startProduction} 
            className="px-3 py-1 bg-white text-red-900 font-bold rounded hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md border-t border-white/5 mt-24 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-label-caps text-label-caps text-primary">SHOWRUNNER AI</span>
          <p className="font-terminal-sm text-[10px] text-on-surface-variant opacity-60">© 2024 SHOWRUNNER AI. POWERED BY QWEN 2.5 &amp; ALIBABA CLOUD. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-terminal-sm text-terminal-sm text-on-surface-variant hover:text-tertiary transition-colors" href="#">Terms of Service</a>
          <a className="font-terminal-sm text-terminal-sm text-on-surface-variant hover:text-tertiary transition-colors" href="#">Privacy Policy</a>
          <a className="font-terminal-sm text-terminal-sm text-on-surface-variant hover:text-tertiary transition-colors" href="#">Documentation</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
