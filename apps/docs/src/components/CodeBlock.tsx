import React, { useState, useEffect } from "react";
import { Check, Copy, Code2, Terminal } from "lucide-react";
import { useDocs } from "../context/DocsContext";
import type { PackageManager } from "../types";

export interface CodeBlockProps {
  id: string;
  reactCode?: string;
  vueCode?: string;
  code?: string;
  language?: string;
  filename?: string;
  commands?: {
    pnpm: string;
    npm: string;
    yarn: string;
    bun: string;
  };
}

// Comprehensive tokenizer regex for TSX, Vue SFC, CSS & Bash
const TOKEN_REGEX =
  /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?(?:[A-Z][A-Za-z0-9_]*|[a-z0-9-]+))|(\b(?:import|export|from|default|const|let|var|function|return|interface|type|extends|as|setup|template|script|ref|computed|defineNuxtConfig)\b)|(\b[a-zA-Z0-9_-]+(?==))|([{}()[\]<>=;,.:+\-*/]+)|([a-zA-Z0-9_$]+|\s+)/g;

function renderHighlightedLine(line: string, lineIndex: number, isTerminal: boolean) {
  if (!line) {
    return <span key={lineIndex}>{"\n"}</span>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [fullMatch, comment, str, tag, keyword, attr, punct] = match;

    if (comment) {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-zinc-400 dark:text-zinc-500 italic">
          {comment}
        </span>
      );
    } else if (str) {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-emerald-600 dark:text-emerald-400">
          {str}
        </span>
      );
    } else if (tag) {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-blue-600 dark:text-sky-400 font-semibold">
          {tag}
        </span>
      );
    } else if (keyword) {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-purple-600 dark:text-purple-400 font-medium">
          {keyword}
        </span>
      );
    } else if (attr) {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-amber-600 dark:text-amber-300">
          {attr}
        </span>
      );
    } else if (punct) {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-zinc-500 dark:text-zinc-400">
          {punct}
        </span>
      );
    } else {
      parts.push(
        <span key={`${lineIndex}-${lastIndex}`} className="text-zinc-800 dark:text-zinc-100">
          {fullMatch}
        </span>
      );
    }

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  return (
    <div key={lineIndex} className="table-row">
      {!isTerminal ? (
        <span className="table-cell select-none text-zinc-400/60 dark:text-zinc-600 text-right pr-4 pl-2 font-mono text-[11px] w-8 border-r border-zinc-200/70 dark:border-zinc-800/70">
          {lineIndex + 1}
        </span>
      ) : (
        <span className="table-cell select-none text-zinc-400/60 dark:text-zinc-600 text-right pr-3 pl-3 font-mono text-xs w-6">
          $
        </span>
      )}
      <span className="table-cell pl-4 pr-4 whitespace-pre font-mono text-xs leading-relaxed">
        {parts.length > 0 ? parts : line}
      </span>
    </div>
  );
}

const PM_LIST: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

export function CodeBlock({ id, reactCode, vueCode, code, filename, commands }: CodeBlockProps) {
  const { framework, setFramework, packageManager, setPackageManager, copiedId, copyToClipboard } = useDocs();

  // Determine available modes
  const hasCommands = Boolean(commands && typeof commands === "object");
  const hasReact = Boolean(reactCode && reactCode.trim().length > 0);
  const hasVue = Boolean(vueCode && vueCode.trim().length > 0);
  const isDual = hasReact && hasVue;

  // Local tab state synced with global framework
  const [activeTab, setActiveTab] = useState<"react" | "vue">(() => {
    if (isDual) return framework;
    if (hasReact) return "react";
    if (hasVue) return "vue";
    return framework;
  });

  // Keep in sync with global framework if dual
  useEffect(() => {
    if (isDual) {
      setActiveTab(framework);
    }
  }, [framework, isDual]);

  // Determine current active code
  let currentCode = "";
  if (hasCommands && commands) {
    currentCode = commands[packageManager] || commands.pnpm || "";
  } else if (code) {
    currentCode = code;
  } else if (isDual) {
    currentCode = activeTab === "react" ? reactCode || "" : vueCode || "";
  } else if (hasReact) {
    currentCode = reactCode || "";
  } else if (hasVue) {
    currentCode = vueCode || "";
  }

  const lines = currentCode.split("\n");

  const handleTabClick = (tab: "react" | "vue") => {
    setActiveTab(tab);
    setFramework(tab);
  };

  const handleCopy = () => {
    copyToClipboard(currentCode.trim(), id);
  };

  return (
    <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md overflow-hidden shadow-sm dark:shadow-md transition-colors duration-200">
      {/* CodeBlock Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-zinc-100/90 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800/70">
        {/* Left: Package Managers, Framework Switcher, or File Tag */}
        <div className="flex items-center gap-1.5">
          {hasCommands ? (
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
              <div className="flex items-center p-0.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800/70 border border-zinc-300/50 dark:border-zinc-700/50 text-[11px] font-sans font-medium">
                {PM_LIST.map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setPackageManager(pm)}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] ${
                      packageManager === pm
                        ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs font-bold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>
          ) : isDual ? (
            <div className="flex items-center p-0.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800/70 border border-zinc-300/50 dark:border-zinc-700/50 text-[11px] font-sans font-medium">
              <button
                type="button"
                onClick={() => handleTabClick("react")}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === "react"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.7)]" />
                <span>React (TSX)</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabClick("vue")}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === "vue"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <span>Vue 3 (SFC)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/40 dark:border-zinc-700/40 text-[11px] font-sans font-medium text-zinc-700 dark:text-zinc-300">
              {hasReact && <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.7)]" />}
              {hasVue && <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />}
              {!hasReact && !hasVue && <Code2 className="h-3 w-3 text-primary" />}
              <span>
                {filename
                  ? filename
                  : hasReact
                  ? "React (TSX)"
                  : hasVue
                  ? "Vue 3 (SFC)"
                  : "Code snippet"}
              </span>
            </div>
          )}
        </div>

        {/* Right: Copy Button with Full Light & Dark Support */}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-sans font-medium transition-all duration-150 border shadow-xs active:scale-95 ${
            copiedId === id
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/80 font-semibold"
              : "bg-white hover:bg-zinc-50 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white border-zinc-200/90 dark:border-zinc-700/70"
          }`}
          title="Copy code to clipboard"
        >
          {copiedId === id ? (
            <>
              <Check className="h-3 w-3 text-emerald-500 animate-in zoom-in-50 duration-200" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Display with Line Numbers and Dual Light/Dark Syntax Highlights */}
      <div className="py-3 overflow-x-auto selection:bg-primary/25 selection:text-primary">
        <div className="table min-w-full">
          {lines.map((line, idx) => renderHighlightedLine(line, idx, hasCommands))}
        </div>
      </div>
    </div>
  );
}
