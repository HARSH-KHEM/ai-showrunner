export default function InputSection({ prompt, setPrompt, genre, setGenre, onStart, isGenerating }) {
  const genres = [
    "NOIR THRILLER", "OFFICE ROMANCE", "SCI-FI MYSTERY", "HEIST", "SUPERNATURAL", "REVENGE"
  ];

  return (
    <section className={`py-24 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto transition-opacity duration-300 ${isGenerating ? 'hidden' : ''}`} id="input-section">
      <div className="bg-black/60 backdrop-blur-2xl crimson-glow-border rounded-xl p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <header className="mb-12">
          <span className="text-primary font-label-caps text-label-caps tracking-widest block mb-2">YOUR STORY BEGINS HERE</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg border-l-4 border-primary-container pl-6">DESCRIBE THE SCENE</h2>
        </header>
        <div className="space-y-8">
          <div className="relative">
            <textarea 
              className="w-full bg-surface-container-low border border-outline-variant focus:border-primary-container text-on-surface p-6 rounded-lg font-body-md text-lg min-h-[160px] transition-all outline-none" 
              placeholder="A rainy street in Neo-Tokyo. A lone detective finds a mysterious glowing briefcase..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>
          <div className="space-y-4">
            <span className="font-terminal-sm text-terminal-sm text-on-surface-variant block uppercase tracking-tighter">Select Cinematic Genre</span>
            <div className="flex flex-wrap gap-2">
              {genres.map(g => (
                <button 
                  key={g}
                  onClick={() => setGenre(g)}
                  className={`px-4 py-2 border rounded-full font-label-caps text-label-caps transition-all ${genre === g ? 'bg-primary-container text-white border-primary-container' : 'border-outline-variant hover:border-primary text-on-surface-variant'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <button 
            className="w-full py-6 bg-primary-container text-white font-headline-lg text-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary-container/20 group"
            onClick={onStart}
            disabled={isGenerating}
          >
            <span>BEGIN PRODUCTION</span>
            <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">play_arrow</span>
          </button>
        </div>
      </div>
    </section>
  );
}
