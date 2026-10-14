import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@cui/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function AvatarSection() {
  const [avatarSize, setAvatarSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Avatar</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Image avatar with fallback initials when image is unavailable.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-center p-4">
          <Avatar size={avatarSize}>
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 rounded-2xl max-w-xs mx-auto text-xs">
          <label htmlFor="ctl-avatarSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
          <PlaygroundSelect
            id="ctl-avatarSize"
            value={avatarSize}
            onValueChange={(v) => setAvatarSize(v as any)}
            options={[
              { value: "xs", label: "xs" },
              { value: "sm", label: "sm (Default)" },
              { value: "md", label: "md" },
              { value: "lg", label: "lg" },
              { value: "xl", label: "xl" },
              { value: "2xl", label: "2xl" },
            ]}
          />
        </div>
      </div>

      {/* Sizing Comparison: xs, sm, md, lg, xl, 2xl */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="flex flex-wrap items-center justify-around gap-4 p-6 rounded-3xl border border-border bg-card">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Avatar size={s}>
                <AvatarFallback>{s.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-[11px] text-muted-foreground font-mono">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        id="code-avatar"
        reactCode={`import { Avatar, AvatarImage, AvatarFallback } from "@cui/react";

<Avatar size="${avatarSize}">
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>CU</AvatarFallback>
</Avatar>`}
        vueCode={`<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from "@cui/vue";
</script>

<template>
  <Avatar size="${avatarSize}">
    <AvatarImage src="/avatar.jpg" alt="User" />
    <AvatarFallback>CU</AvatarFallback>
  </Avatar>
</template>`}
      />

      <ComponentDocDetails
        componentName="Avatar"
        anatomy={[
          "Avatar",
          "AvatarImage",
          "AvatarFallback",
        ]}
        props={[
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Controls the dimensions, border radius, and typography scaling of the avatar container.",
          },
          {
            name: "src",
            type: "string",
            description: "URL source of the image displayed inside <AvatarImage>.",
          },
          {
            name: "alt",
            type: "string",
            description: "Alternative text description for accessibility and screen readers on <AvatarImage>.",
          },
          {
            name: "onLoadingStatusChange",
            type: '(status: "idle" | "loading" | "loaded" | "error") => void',
            description: "Callback triggered when the image state transitions through loading lifecycles.",
          },
          {
            name: "delayMs",
            type: "number",
            default: "0",
            description: "Millisecond delay before displaying <AvatarFallback> to avoid flash on fast-loading networks.",
          },
        ]}
        accessibility={{
          aria: [
            { attribute: 'alt="..."', description: "Required on AvatarImage for descriptive screen-reader announcements." },
            { attribute: 'role="img"', description: "Implicit or explicit role communicating user profile imagery." },
            { attribute: 'aria-label', description: "Recommended on AvatarFallback when initials or symbols need assistive context." },
          ],
        }}
      />
    </div>
  );
}

