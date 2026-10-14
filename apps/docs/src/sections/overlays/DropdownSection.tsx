import React, { useState } from "react";
import {
  User,
  CreditCard,
  Settings,
  UserPlus,
  Mail,
  MessageSquare,
  Trash2,
  LogOut,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Button,
} from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function DropdownSection() {
  const [ddShowStatus, setDdShowStatus] = useState(true);
  const [ddShowPanel, setDdShowPanel] = useState(false);
  const [ddPosition, setDdPosition] = useState("bottom");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Dropdown Menu</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Action menu with shortcuts, checkbox &amp; radio items, sub-menus and destructive actions.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-12 flex flex-wrap items-center justify-center gap-4 shadow-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button id="demo-dropdown-trigger" variant="outline">
              <User className="h-3.5 w-3.5 mr-1.5" />
              My Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User /> Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard /> Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus /> Invite users
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem><Mail /> Email</DropdownMenuItem>
                <DropdownMenuItem><MessageSquare /> Message</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 /> Delete account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut /> Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              View options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={ddShowStatus} onCheckedChange={(v) => setDdShowStatus(!!v)}>
              Status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={ddShowPanel} onCheckedChange={(v) => setDdShowPanel(!!v)}>
              Side panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Panel position</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={ddPosition} onValueChange={setDdPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-[11px] text-muted-foreground text-center -mt-4">
        Status bar: <span className="font-mono text-foreground">{String(ddShowStatus)}</span> &bull; Side panel:{" "}
        <span className="font-mono text-foreground">{String(ddShowPanel)}</span> &bull; Position:{" "}
        <span className="font-mono text-foreground">{ddPosition}</span>
      </p>

      <CodeBlock
        id="code-dropdown"
        reactCode={`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, Button,
} from "@cui-universal/react";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">My Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="start">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuCheckboxItem checked={status} onCheckedChange={setStatus}>
      Status bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        vueCode={`<script setup lang="ts">
import { ref } from "vue";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, Button,
} from "@cui-universal/vue";

const status = ref(true);
const position = ref("bottom");
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">My Account</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="start">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuCheckboxItem v-model:checked="status">Status bar</DropdownMenuCheckboxItem>
      <DropdownMenuRadioGroup v-model="position">
        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>`}
      />

      <ComponentDocDetails
        componentName="DropdownMenu"
        anatomy={[
          "DropdownMenu",
          "DropdownMenuTrigger",
          "DropdownMenuContent",
          "DropdownMenuGroup",
          "DropdownMenuItem",
          "DropdownMenuCheckboxItem",
          "DropdownMenuRadioGroup",
          "DropdownMenuRadioItem",
          "DropdownMenuLabel",
          "DropdownMenuSeparator",
          "DropdownMenuShortcut",
          "DropdownMenuSub",
          "DropdownMenuSubTrigger",
          "DropdownMenuSubContent",
        ]}
        props={[
          {
            name: "open",
            type: "boolean",
            default: "false",
            description: "Controlled open state of the dropdown menu.",
          },
          {
            name: "defaultOpen",
            type: "boolean",
            default: "false",
            description: "Initial open state for uncontrolled usage.",
          },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            default: "undefined",
            description: "Callback invoked when menu visibility transitions.",
          },
          {
            name: "align",
            type: '"start" | "center" | "end"',
            default: '"start"',
            description: "Horizontal alignment along the trigger axis.",
          },
          {
            name: "side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"bottom"',
            description: "Side of trigger the menu content anchors against.",
          },
          {
            name: "variant",
            type: '"default" | "destructive"',
            default: '"default"',
            description: "Visual appearance style for DropdownMenuItem (e.g. destructive highlights in red).",
          },
          {
            name: "checked",
            type: "boolean",
            default: "false",
            description: "Checked state for DropdownMenuCheckboxItem.",
          },
          {
            name: "value",
            type: "string",
            description: "Unique value identifying selected radio item within DropdownMenuRadioGroup.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Prevents item selection and disables hover / pointer events.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space / Enter", description: "Opens dropdown when focused on trigger; executes focused menu item action." },
            { key: "ArrowDown / ArrowUp", description: "Cycles focus sequentially through enabled menu items." },
            { key: "ArrowRight", description: "Opens nested sub-menu when on a DropdownMenuSubTrigger." },
            { key: "ArrowLeft", description: "Closes active sub-menu and returns focus to parent trigger." },
            { key: "Escape", description: "Closes the entire menu tree and restores focus to main trigger button." },
          ],
          aria: [
            { attribute: 'aria-haspopup="menu"', description: "Declares that button controls a flyout menu." },
            { attribute: 'aria-expanded', description: "Reflects true when menu panel is currently visible." },
            { attribute: 'role="menu"', description: "Semantic role on DropdownMenuContent identifying actionable item list." },
            { attribute: 'role="menuitem" / "menuitemcheckbox"', description: "Semantic roles mapped across actionable and selectable items." },
            { attribute: 'aria-checked', description: "Communicates check state on checkbox and radio items." },
          ],
        }}
      />
    </div>
  );
}

