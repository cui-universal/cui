import React, { useEffect } from "react";
import { Search, X, Compass, Palette } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@cui-universal/react";
import { useDocs } from "../context/DocsContext";
import { NAV_GROUPS, THEME_COLORS } from "../data/navigation";

export function Sidebar() {
  const {
    currentSection,
    setCurrentSection,
    searchQuery,
    setSearchQuery,
    mobileMenuOpen,
    setMobileMenuOpen,
    framework,
    setFramework,
    activeTheme,
    setActiveTheme,
  } = useDocs();

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const filteredNavGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  const renderNavItems = (isMobile = false) => (
    <div className="space-y-6">
      {filteredNavGroups.map((group) => (
        <div key={group.category} className="space-y-1">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-3 py-1">
            {group.category}
          </h4>
          {group.items.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <a
                key={item.id}
                id={isMobile ? `mobile-nav-${item.id}` : `nav-${item.id}`}
                href={item.id === "intro" ? "/" : `/${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSection(item.id);
                  if (isMobile) {
                    setMobileMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar (Only visible on md and up) */}
      <aside className="hidden md:block w-64 shrink-0 py-6 md:sticky md:top-16 md:h-[calc(100vh-4rem)] overflow-y-auto pr-2 border-r border-border/60">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            id="search-components-input"
            type="text"
            placeholder="Quick search primitives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary/50 border border-border/80 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        {/* Nav Groups */}
        {renderNavItems(false)}
      </aside>

      {/* 2. Mobile Navigation Drawer & Sheet (Only visible on < md when toggled) */}
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-card border-r border-border shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 px-4 border-b border-border/70 flex items-center justify-between shrink-0 bg-secondary/30">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              CUI
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              32 Primitives
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="h-8 w-8 rounded-xl border border-border/80 bg-secondary/60 hover:bg-secondary text-foreground flex items-center justify-center transition-all"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Framework & Palette Quick Toolbar */}
        <div className="p-3 border-b border-border/60 bg-secondary/20 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground">Framework:</span>
            <Tabs
              value={framework}
              onValueChange={(val) => setFramework(val as any)}
              size="xs"
              radius="full"
            >
              <TabsList className="bg-secondary/80 border border-border/80 p-0.5">
                <TabsTrigger value="react" className="px-2.5 py-0.5 text-[11px] font-semibold gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  React
                </TabsTrigger>
                <TabsTrigger value="vue" className="px-2.5 py-0.5 text-[11px] font-semibold gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Vue 3
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Accent:</span>
            <div className="flex items-center gap-1.5">
              {THEME_COLORS.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveTheme(t)}
                  className={`h-4 w-4 rounded-full transition-transform active:scale-95 ${
                    activeTheme.name === t.name ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "opacity-75"
                  }`}
                  style={{ backgroundColor: `hsl(${t.primary})` }}
                  title={`${t.name} theme`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Search Input */}
        <div className="p-3 border-b border-border/60 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              id="mobile-search-components-input"
              type="text"
              placeholder="Search primitives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-xl bg-secondary/50 border border-border/80 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Drawer Nav List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-3">
          {renderNavItems(true)}
        </div>
      </aside>
    </>
  );
}

