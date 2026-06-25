import { useRef, useState } from 'react';

export default function Completed({ isVisible, videoSrc }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isVisible) return null;

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative py-24 px-margin-mobile md:px-margin-desktop overflow-hidden" id="completed-section">
      <div className="absolute inset-0 z-[100] pointer-events-none opacity-0 reveal-flash" id="white-flash"></div>
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-primary-container text-white text-[10px] font-bold tracking-tighter uppercase">Production Complete</span>
            <h2 className="font-headline-lg text-4xl md:text-6xl tracking-tight leading-none">THE SILENT PROTOCOL</h2>
            <div className="flex gap-4 text-terminal-sm text-on-surface-variant font-terminal-sm">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 25 SEC</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">movie_filter</span> 5 SCENES</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">precision_manufacturing</span> WAN 2.1 MODEL</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a 
              href={videoSrc} 
              download="final_drama.mp4" 
              className="px-8 py-3 bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 transition-colors inline-block"
              onClick={(e) => {
                e.preventDefault();
                fetch(videoSrc)
                  .then(res => res.blob())
                  .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'final_drama.mp4';
                    a.click();
                    window.URL.revokeObjectURL(url);
                  });
              }}
            >
              <span className="material-symbols-outlined">download</span> DOWNLOAD
            </a>
            <button className="px-8 py-3 border border-white text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">share</span> SHARE
            </button>
          </div>
        </header>

        <div className="aspect-video bg-black rounded-xl overflow-hidden relative group border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-[65%]"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-primary-container/90 rounded-full flex items-center justify-center text-white scale-100 hover:scale-110 transition-transform pointer-events-auto"
            >
              <span className="material-symbols-outlined text-5xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
          </div>
          <div className="w-full h-full absolute inset-0 bg-cover bg-center">
            {videoSrc ? (
              <video 
                ref={videoRef}
                src={videoSrc} 
                className="w-full h-full object-cover" 
                controls={false}
                loop 
                playsInline 
              />
            ) : (
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6xKdt8HGoPNwQaxBGa1z4FKE9hDMRkIV70-7kVOtGqZRQu-22u8W8yg6MEqEp6GNVc4bZNhHf9u0IfC9XhmJQHSr1czSVkj6pchXNebOK8mOhX2Mqo4xn8ZG6mK3ald0-pffd_kJVUPZbZPR6x0fd2O9edt7zjnKNe_Gq2DjVWnSobdHLrFv6_2iI9XJUfzNsopSl3mh4ILDM3NIW7EK3RLeRq6lnHnnvUt-K22bdKw79zXo_0t5bmOas4qWJFgk1n-AslJ1E7n8')" }}></div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">STORYBOARD BREAKDOWN</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2 group">
              <div className="aspect-[4/3] bg-surface-container-high rounded overflow-hidden border border-white/5 group-hover:border-primary/50 transition-colors">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsERc8tRLaFb8f6S-Wv-qwFwIPtuw2kepr1dTmSA3nZtJLz63BSOTtHAJGdeJe5ZBxOu7v8Z5zc1DHTu3RciQt045uSVYUKfhBGwJuLa1HPGc6p5CMPmujXZsCaILrQEUsLJ_lfhQxVEzC2JCLVDJCEymRg5pYlD1JSAYIrMYaOEkpHQic8NBM3bfH-f0f5IEPcQZf0_YuAJOsYB0LEs2UgA7ieB1wngbMkflGV3nV6zn8vQJX6kdRs440aAUdZeks-vv8r0eAgy8')" }}></div>
              </div>
              <span className="text-[10px] font-terminal-sm text-white/40 block">SCENE 01: THE AWAKENING</span>
            </div>
            <div className="space-y-2 group">
              <div className="aspect-[4/3] bg-surface-container-high rounded overflow-hidden border border-white/5 group-hover:border-primary/50 transition-colors">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9fBL97qRHWjCvKUfuib8y6kYKUL1k1bEh8qTWICcqIBL5ylUD1XV835dJb5GynPEw3o1g9s4Fl5QFCaBo7jIujTg_luL4th953dvJclPzkwmimmHZbuxawjgpQHoXD9WKeQyT9b5DkELb0eZiem8z-t-JmwMo70uGZe0AtJYlWr0-DKpP31pw_VhzjdcH2EgOFnWLXniVwG73ZdcvzqyCUXxGyZXk3aIuxCyYu_95HNov5rddeLCUFeD5qFIZWi5RT1_nV7OyT1Q')" }}></div>
              </div>
              <span className="text-[10px] font-terminal-sm text-white/40 block">SCENE 02: THE UPLOAD</span>
            </div>
            <div className="space-y-2 group">
              <div className="aspect-[4/3] bg-surface-container-high rounded overflow-hidden border border-white/5 group-hover:border-primary/50 transition-colors">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtsH2yi617xAX7VmRRRo-D4beWxjGjOkBiweAHZaKp2N6n08Rh_-Vs5gExyg7hMQyofpc10fQGCWzVH0gBvQxnA91jjrRypmb7ug0fzQORoOgar1D2o1iVb7O1uuIsDTEJQC8q1GyLIXpu4RO5jQqUszk0i2mYQLT0xZJIyjkHxg8J8tYnRn4aelcTz6IIHqQcBDi458Fiqlc5yN0AAiuZS7eyqxHabHWFJQpmwKHZMI-d8NAo9-yK7W8xLtFcwQyP7bEIAn44ybc')" }}></div>
              </div>
              <span className="text-[10px] font-terminal-sm text-white/40 block">SCENE 03: THE PURSUIT</span>
            </div>
            <div className="space-y-2 group">
              <div className="aspect-[4/3] bg-surface-container-high rounded overflow-hidden border border-white/5 group-hover:border-primary/50 transition-colors">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9-ikS6_gQLHMVsNxzxHwDvjTOthy6gcQejtN5MxEOEV6K8RAvqINAJ7bBLLsDOa95llBumpNjEDsvNvOty_YyiXLWOyaVG1Ut4yS3Mhx0IxikEjorPFpIHQSUZ-BT4hosdsXCTABq2UypcSnkNwBsAd_UiLafRBrLWhHRqHoxYmnOhbF086jIMivm30TqlEVmVKmZCXeo4Dast2YFAJS69j1wHmRcrxJhX7XfCjuOY34NqhgG7HJERl4rGIFJvTqw83NBTOBVZzo')" }}></div>
              </div>
              <span className="text-[10px] font-terminal-sm text-white/40 block">SCENE 04: THE CONFRONTATION</span>
            </div>
            <div className="space-y-2 group">
              <div className="aspect-[4/3] bg-surface-container-high rounded overflow-hidden border border-white/5 group-hover:border-primary/50 transition-colors">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGDfrGBvfixROhxQr5RG-BufFZh7rhKayB3204Cn-RYiBDjwwHBmBwK3ewLeWf-NW9PTBhVME4KU_DuujdOPkPfLyMiFisTgNa8JqZ8x8TYSYjPFTPa4-X5S_loPqWEdZEkBYvLJkyYsBf2tWItyDQf1YizY4ZBxeC--BWgpq_m_7RUJGw1CA52GQ5-VEpLR2CI8fdPM5rtpK-6qsOcBujbxktkB4bX5JL7yXmWoy5k32xeg9NL_9bN9000e3trj3WA8R4YF_WpfE')" }}></div>
              </div>
              <span className="text-[10px] font-terminal-sm text-white/40 block">SCENE 05: THE RESOLUTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
