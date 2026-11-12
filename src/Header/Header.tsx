function Header() {
  return (
    <header className="sticky top-0 z-40 w-full pt-safe bg-surface/90 backdrop-blur-md border-b border-border-subtle/80">
      <div className="h-16 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">
              two_wheeler
            </span>
          </div>
          <span className="text-base font-bold tracking-tight text-on-surface">
            MotoServicios
          </span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="text-xs font-semibold text-tertiary">En Línea</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
