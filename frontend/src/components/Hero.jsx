export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center px-margin-mobile md:px-margin-desktop" id="hero">
      <div className="max-w-6xl space-y-stack-md">
        <h1 className="font-display-xl text-[64px] md:text-display-xl flex flex-col leading-none">
          <span className="stagger-in" style={{ animationDelay: '0.2s' }}>ONE PROMPT.</span>
          <span className="stagger-in" style={{ animationDelay: '0.4s' }}>FIVE AI AGENTS.</span>
          <span className="stagger-in text-primary-container" style={{ animationDelay: '0.6s' }}>ONE SHORT DRAMA.</span>
        </h1>
        <div className="w-24 h-1 bg-white mx-auto stagger-in" style={{ animationDelay: '0.8s' }}></div>
        <p className="font-terminal-sm text-terminal-sm text-on-surface-variant stagger-in opacity-80" style={{ animationDelay: '1s' }}>
          SYSTEM READY // READY FOR INPUT // CINEMATIC ENGINE ENGAGED
        </p>
      </div>
      <div className="absolute bottom-12 animate-bounce opacity-40">
        <span className="material-symbols-outlined text-4xl">expand_more</span>
      </div>
    </section>
  );
}
