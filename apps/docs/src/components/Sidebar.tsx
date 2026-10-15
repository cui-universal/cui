import React from "react";
import { Search } from "lucide-react";
import { useDocs } from "../context/DocsContext";
import { NAV_GROUPS } from "../data/navigation";

export function Sidebar() {
  const { currentSection, setCurrentSection, searchQuery, setSearchQuery } = useDocs();

  const filteredNavGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <aside className="w-full md:w-64 shrink-0 py-6 md:sticky md:top-16 md:h-[calc(100vh-4rem)] overflow-y-auto pr-2 border-r border-border/60">
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
                  id={`nav-${item.id}`}
                  href={item.id === "intro" ? "/" : `/${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSection(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
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
    </aside>
  );
}
