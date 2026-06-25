export default function TopNavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-black/40 backdrop-blur-xl border-b border-primary-container">
      <div className="flex items-center gap-4">
        <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter">SHOWRUNNER</span>
        <span className="hidden md:block h-4 w-[1px] bg-outline-variant"></span>
        <div className="hidden md:flex gap-2">
          <span className="px-2 py-0.5 border border-tertiary text-tertiary text-label-caps font-label-caps rounded-sm">WAN 2.1 ELITE</span>
          <span className="px-2 py-0.5 border border-primary text-primary text-label-caps font-label-caps rounded-sm">DIRECTOR ACCESS</span>
        </div>
      </div>
      <div className="flex items-center gap-stack-md">
        <span className="hidden lg:block font-terminal-sm text-terminal-sm text-on-surface-variant opacity-60">Powered by Qwen AI • Alibaba Cloud</span>
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
        </button>
      </div>
    </nav>
  );
}
