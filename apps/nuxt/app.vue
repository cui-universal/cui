<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Progress,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Kbd,
} from "@cui-universal/vue";
import {
  Layers,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Check,
  Search,
  ExternalLink,
  Code2,
  Terminal,
  User,
  Settings,
  LogOut,
  Bell,
  Zap,
} from "lucide-vue-next";

// Dark mode state
const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  }
});

// Demo state
const switchVal = ref(true);
const checkVal = ref(true);
const inputVal = ref("Nuxt 3 + @cui-universal/vue");
const progressVal = ref(68);
const btnLoading = ref(false);

const simulateAction = () => {
  btnLoading.value = true;
  setTimeout(() => {
    btnLoading.value = false;
  }, 1200);
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-200">
    <!-- Header -->
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-full bg-white p-1 flex items-center justify-center border border-border shadow-xs">
            <span class="font-black text-sm text-sky-600">CUI</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-base tracking-tight">CUI Nuxt 3 Demo</span>
              <Badge variant="secondary" size="sm">Public npm</Badge>
            </div>
            <p class="text-[10px] text-muted-foreground hidden sm:block">
              Consuming @cui-universal/vue &amp; @cui-universal/theme
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.npmjs.com/package/@cui-universal/vue"
            target="_blank"
            rel="noreferrer"
            class="text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/80 bg-secondary/60 hover:bg-secondary flex items-center gap-1.5 transition-colors"
          >
            <span class="text-red-500 font-bold font-mono">npm</span>
            <span class="hidden sm:inline">v0.1.0</span>
            <ExternalLink class="h-3 w-3 text-muted-foreground" />
          </a>

          <a
            href="https://github.com/cui-universal/cui"
            target="_blank"
            rel="noreferrer"
            class="text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/80 bg-secondary/60 hover:bg-secondary flex items-center gap-1.5 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink class="h-3 w-3 text-muted-foreground" />
          </a>

          <button
            type="button"
            @click="toggleTheme"
            class="p-2 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground transition-all"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Sun v-if="isDark" class="h-4 w-4 text-amber-400" />
            <Moon v-else class="h-4 w-4 text-indigo-500" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <!-- Hero Section -->
      <div class="relative rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card/80 to-background p-8 sm:p-12 overflow-hidden shadow-sm">
        <div class="space-y-4 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Sparkles class="h-3.5 w-3.5" />
            <span>Nuxt 3 Module Integration</span>
            <span class="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold">Live npm</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Universal UI for Nuxt 3 <br />
            <span class="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              Zero External UI Dependencies
            </span>
          </h1>

          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            This Nuxt 3 application imports published packages directly from the npm registry:
            <code class="font-mono text-xs px-1.5 py-0.5 rounded bg-muted text-foreground">@cui-universal/vue</code> and
            <code class="font-mono text-xs px-1.5 py-0.5 rounded bg-muted text-foreground">@cui-universal/theme</code>.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <div class="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2 shadow-inner">
              <Terminal class="h-3.5 w-3.5 text-emerald-400" />
              <span>pnpm add @cui-universal/vue @cui-universal/theme</span>
            </div>
            <Button variant="default" right-icon="true" @click="simulateAction" :loading="btnLoading">
              Test Action
              <ArrowRight class="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Component Showcase Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 1. Buttons & Badges Card -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Buttons &amp; Badges</CardTitle>
              <Badge variant="success">Interactive</Badge>
            </div>
            <CardDescription>Button variants, loading states, and status badges</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex flex-wrap items-center gap-2.5">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="success">Success</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Alert</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <div class="flex items-center gap-3 pt-2 border-t border-border/60">
              <Button size="sm" :loading="btnLoading" @click="simulateAction">
                {{ btnLoading ? 'Loading...' : 'Click for Loader' }}
              </Button>
              <span class="text-xs text-muted-foreground">Press to test loading spinner</span>
            </div>
          </CardContent>
        </Card>

        <!-- 2. Form Controls Card -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Form Controls</CardTitle>
              <Badge variant="secondary">Two-Way v-model</Badge>
            </div>
            <CardDescription>Inputs, Switches, Checkboxes &amp; Textareas</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-muted-foreground">Input Field</label>
              <Input v-model="inputVal" placeholder="Type something..." />
            </div>

            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
                <span class="text-xs font-medium">Toggle Switch</span>
                <Switch v-model:checked="switchVal" />
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
                <span class="text-xs font-medium">Checkbox</span>
                <Checkbox v-model:checked="checkVal" />
              </div>
            </div>

            <div class="text-[11px] text-muted-foreground font-mono bg-muted/40 p-2 rounded-lg">
              Switch: {{ switchVal }} &bull; Checkbox: {{ checkVal }}
            </div>
          </CardContent>
        </Card>

        <!-- 3. Overlays: Dialog & Dropdown Menu -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Dialog &amp; Dropdown</CardTitle>
              <Badge variant="default">Zero Radix</Badge>
            </div>
            <CardDescription>Accessible modal dialogs and flyout menus</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex flex-wrap items-center gap-3">
              <!-- Dialog Modal -->
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="outline">
                    <Layers class="h-4 w-4 mr-1.5" />
                    Open Nuxt Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nuxt 3 Dialog Example</DialogTitle>
                    <DialogDescription>
                      This dialog is rendered by @cui-universal/vue with accessible focus trap and keyboard ESC dismissal.
                    </DialogDescription>
                  </DialogHeader>
                  <div class="py-3 text-xs text-muted-foreground space-y-2">
                    <p>It works seamlessly in Nuxt 3 with zero external Radix dependencies.</p>
                    <Input placeholder="Focus trap test input" />
                  </div>
                  <DialogFooter>
                    <DialogClose as-child>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose as-child>
                      <Button variant="default">Confirm</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <!-- Dropdown Menu -->
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="secondary">
                    <User class="h-4 w-4 mr-1.5" />
                    Action Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-48">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User class="h-3.5 w-3.5 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings class="h-3.5 w-3.5 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut class="h-3.5 w-3.5 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <!-- Avatar -->
              <Avatar size="md">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
                <AvatarFallback>NX</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        <!-- 4. Disclosure: Accordion & Tabs -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Accordion &amp; Tabs</CardTitle>
              <Badge variant="secondary">Animated</Badge>
            </div>
            <CardDescription>Collapsible panels and active tab transitions</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Accordion type="single" collapsible default-value="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Why choose CUI Universal?</AccordionTrigger>
                <AccordionContent>
                  Zero external UI dependencies. 100% theme parity across React, Next.js, Vue 3, and Nuxt 3 with unified Tailwind presets.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How are styles loaded?</AccordionTrigger>
                <AccordionContent>
                  The @cui-universal/vue/nuxt module automatically loads @cui-universal/theme/styles.css into your Nuxt application.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <!-- Progress & System Metrics -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>System Progress &amp; Keyboard Shortcuts</CardTitle>
            <span class="text-xs font-mono font-bold">{{ progressVal }}%</span>
          </div>
          <CardDescription>Interactive progress meter and kbd shortcuts</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Progress :value="progressVal" />

          <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div class="flex items-center gap-2">
              <Button size="xs" variant="outline" @click="progressVal = Math.max(0, progressVal - 10)">-10%</Button>
              <Button size="xs" variant="outline" @click="progressVal = Math.min(100, progressVal + 10)">+10%</Button>
            </div>

            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Quick keys:</span>
              <Kbd>⌘K</Kbd>
              <span>Search</span>
              <Kbd>ESC</Kbd>
              <span>Close</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
