import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
} from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function DialogSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Dialog (Modal)</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Modal dialog with animated fade/zoom and accessible focus trap.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" id="open-dialog-btn">
              Open Modal Dialog
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Profile Credentials</DialogTitle>
              <DialogDescription>
                Make changes to your profile credentials here.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-3 text-left">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
                <Input defaultValue="Sarah Connor" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Email</label>
                <Input defaultValue="sarah@resistance.org" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-xs text-muted-foreground">Click button above to trigger animated modal</p>
      </div>

      <CodeBlock
        id="code-dialog"
        reactCode={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from "@cui-universal/react";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        vueCode={`<script setup lang="ts">
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from "@cui-universal/vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Open</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>`}
      />

      <ComponentDocDetails
        componentName="Dialog"
        anatomy={[
          "Dialog",
          "DialogTrigger",
          "DialogContent",
          "DialogHeader",
          "DialogTitle",
          "DialogDescription",
          "DialogFooter",
          "DialogClose",
        ]}
        props={[
          {
            name: "open",
            type: "boolean",
            default: "false",
            description: "Controlled open state of the modal dialog.",
          },
          {
            name: "defaultOpen",
            type: "boolean",
            default: "false",
            description: "Initial open state when uncontrolled.",
          },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            default: "undefined",
            description: "Callback invoked when modal visibility opens or closes.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space / Enter", description: "Opens dialog when trigger is focused." },
            { key: "Escape", description: "Closes the modal dialog and restores trigger focus." },
            { key: "Tab", description: "Traps keyboard focus strictly within the modal content." },
          ],
          aria: [
            "Modal overlay uses role='dialog' with aria-modal='true'.",
            "Content references DialogTitle via aria-labelledby and DialogDescription via aria-describedby.",
            "Scroll locks <body> automatically while open.",
          ],
        }}
      />
    </div>
  );
}
