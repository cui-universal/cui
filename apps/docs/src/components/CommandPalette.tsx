import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";
import { useDocs } from "../context/DocsContext";
import { NAV_GROUPS } from "../data/navigation";
import type { Section } from "../types";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { setCurrentSection } = useDocs();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  // Flatten and filter navigation items
  const results = NAV_GROUPS.flatMap((group) =>
    group.items
      .filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          group.category.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase())
      )
      .map((item) => ({ ...item, category: group.category }))
  );

  const handleSelect = (sectionId: Section) => {
    setCurrentSection(sectionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-border/70 bg-secondary/30 gap-3">
          <Search className="h-4 w-4 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a component name or guide (e.g. Button, Dialog, Theming)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No primitives found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-secondary/70 focus:bg-secondary/70 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-primary/20 text-primary">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-border/60 bg-secondary/20 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>32 Universal Primitives &bull; Vue, Nuxt 4 &amp; React</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Click or press ↵ to jump</span>
          </div>
        </div>
      </div>
    </div>
  );
}
