import React from "react";
import { CheckCircle2, ShieldCheck, Keyboard } from "lucide-react";
import { PropsTable, type PropItem } from "./PropsTable";

export type AriaItem = string | { attribute?: string; name?: string; description: string };

interface ComponentDocDetailsProps {
  componentName: string;
  reactImport?: string;
  vueImport?: string;
  anatomy?: string[];
  props: PropItem[];
  accessibility?: {
    keyboard?: { key: string; description: string }[];
    aria?: AriaItem[];
  };
}

export function ComponentDocDetails({
  componentName,
  reactImport,
  vueImport,
  anatomy,
  props,
  accessibility,
}: ComponentDocDetailsProps) {
  return (
    <div className="space-y-6 pt-4 border-t border-border/60">
      {/* Anatomy & Structure */}
      {anatomy && anatomy.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <span>Component Anatomy</span>
          </h3>
          <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 flex flex-wrap gap-2 text-xs">
            {anatomy.map((part) => (
              <span
                key={part}
                className="px-2 py-1 rounded-lg bg-secondary/80 border border-border/50 font-mono text-[11px] text-foreground font-semibold"
              >
                &lt;{part}&gt;
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Props & API Reference */}
      <PropsTable props={props} />

      {/* Accessibility & Keyboard Navigation */}
      {accessibility && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Accessibility &amp; Keyboard Interaction</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {accessibility.keyboard && accessibility.keyboard.length > 0 && (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <Keyboard className="h-3.5 w-3.5" />
                  <span>Keyboard Navigation</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {accessibility.keyboard.map((k) => (
                    <div key={k.key} className="flex items-center justify-between">
                      <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px] border border-border/60 text-foreground font-semibold">
                        {k.key}
                      </kbd>
                      <span className="text-[11px] text-muted-foreground">{k.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {accessibility.aria && accessibility.aria.length > 0 && (
              <div className="p-3.5 rounded-xl border border-border/70 bg-card/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>ARIA Standards &amp; States</span>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {accessibility.aria.map((item, idx) => {
                    if (typeof item === "string") {
                      return (
                        <li key={idx} className="text-[11px] leading-relaxed flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      );
                    }
                    const attr = item.attribute || item.name;
                    return (
                      <li key={idx} className="text-[11px] leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <div className="flex-1">
                          {attr && (
                            <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px] text-foreground font-semibold mr-1.5 border border-border/50">
                              {attr}
                            </code>
                          )}
                          <span>{item.description}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
