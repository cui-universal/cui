import React from "react";

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropItem[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
        <span>Component API &amp; Props Reference</span>
      </h3>
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/40 border-b border-border/60 text-muted-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-4 font-mono text-[11px]">Prop</th>
                <th className="py-2.5 px-4 font-mono text-[11px]">Type</th>
                <th className="py-2.5 px-4 font-mono text-[11px]">Default</th>
                <th className="py-2.5 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {props.map((p) => (
                <tr key={p.name} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-primary flex items-center gap-1.5">
                    {p.name}
                    {p.required && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-destructive/10 text-destructive font-sans font-semibold">
                        Required
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-muted-foreground">
                    <span className="px-1.5 py-0.5 rounded bg-secondary/80 text-foreground font-semibold">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-muted-foreground">
                    {p.default ? <code>{p.default}</code> : <span className="opacity-40">-</span>}
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground leading-relaxed">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
