<script setup lang="ts">
import { ref } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Steps,
  DatePicker,
  TextEditor,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@cui-universal/vue";
import {
  Sparkles,
  ShoppingBag,
  Truck,
  CreditCard,
  CheckCircle2,
  Calendar as CalendarIcon,
  FileText,
  Layers,
  ArrowRight,
  ArrowLeft,
  Edit3,
  Eye,
} from "lucide-vue-next";
import { useCommerce } from "~/composables/useCommerce";

const { showToast } = useCommerce();

// 1. Steps State
const currentStep = ref(1);
const checkoutSteps = [
  { id: 1, title: "Cart Review", description: "3 items selected", icon: ShoppingBag },
  { id: 2, title: "Shipping Address", description: "Warehouse selection", icon: Truck },
  { id: 3, title: "Payment Info", description: "Stripe & Visa token", icon: CreditCard },
  { id: 4, title: "Order Confirmed", description: "Tracking generated", icon: CheckCircle2 },
];

const nextStep = () => {
  if (currentStep.value < checkoutSteps.length - 1) {
    currentStep.value++;
    showToast(`Advanced to Step ${currentStep.value + 1}: ${checkoutSteps[currentStep.value].title}`);
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    showToast(`Returned to Step ${currentStep.value + 1}: ${checkoutSteps[currentStep.value].title}`);
  }
};

// 2. DatePicker State
const pickedDate = ref("2026-10-14");
const departureDate = ref("");

// 3. TextEditor State
const sampleMarkdown = ref(
  `# Studio Pro Audio System

Engineered with custom **40mm dynamic drivers** and high-grade titanium domes.

### Technical Highlights:
- Active Noise Cancellation with 8 MEMS microphones
- Lossless Bluetooth 5.4 with LDAC & aptX HD support
- 45-hour continuous battery life on single USB-C charge

> "The benchmark in wireless precision audio monitoring."`
);

// 4. Pagination State
const activePage = ref(2);

useHead({
  title: "Component Studio - CUI Universal Components",
});
</script>

<template>
  <div class="space-y-6 max-w-6xl">
    <!-- Breadcrumb Header -->
    <div class="space-y-2">
      <Breadcrumb>
        <BreadcrumbItem>
          <NuxtLink to="/" class="hover:text-foreground">Home</NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <span class="text-muted-foreground">Universal UI</span>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink :active="true">Component Studio</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <span>Component Studio</span>
            <Badge variant="default" class="text-xs px-2 py-0.5">New Additions</Badge>
          </h1>
          <p class="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Test and interact with newly added components: Steps, DatePicker, TextEditor, Pagination, and Breadcrumb.
          </p>
        </div>
      </div>
    </div>

    <!-- 1. STEPS (Stepper) Showcase -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Layers class="h-4 w-4" />
            </div>
            <div>
              <CardTitle>Steps / Stepper</CardTitle>
              <CardDescription>Multi-stage workflow indicator with reactive states and custom icons</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" class="font-mono text-xs">
            Step {{ currentStep + 1 }} of {{ checkoutSteps.length }}
          </Badge>
        </div>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Interactive Steps Component -->
        <div class="p-4 sm:p-6 rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm">
          <Steps
            v-model="currentStep"
            :steps="checkoutSteps"
            :clickable="true"
          />
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="currentStep === 0"
            class="gap-1.5"
            @click="prevStep"
          >
            <ArrowLeft class="h-3.5 w-3.5" />
            <span>Previous Step</span>
          </Button>

          <span class="text-xs text-muted-foreground">Click any step or use controls</span>

          <Button
            size="sm"
            :disabled="currentStep === checkoutSteps.length - 1"
            class="gap-1.5"
            @click="nextStep"
          >
            <span>Next Step</span>
            <ArrowRight class="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 2. DATEPICKER Showcase -->
      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <CalendarIcon class="h-4 w-4" />
            </div>
            <div>
              <CardTitle>DatePicker & Calendar</CardTitle>
              <CardDescription>Date selection popover with quick preset shortcuts and month traversal</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-muted-foreground">Order Date Filter</label>
            <DatePicker
              v-model="pickedDate"
              placeholder="Select order dispatch date"
              @change="(d) => showToast(`Selected date: ${d}`)"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-muted-foreground">Delivery Window Date</label>
            <DatePicker
              v-model="departureDate"
              placeholder="Pick scheduled departure date"
              @change="(d) => showToast(`Scheduled: ${d}`)"
            />
          </div>

          <div class="p-3 rounded-lg border border-border/60 bg-muted/30 text-xs space-y-1 font-mono">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Order Date:</span>
              <span class="font-bold text-primary">{{ pickedDate || "None" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Delivery Date:</span>
              <span class="font-bold text-foreground">{{ departureDate || "None" }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 3. PAGINATION Showcase -->
      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles class="h-4 w-4" />
            </div>
            <div>
              <CardTitle>Pagination</CardTitle>
              <CardDescription>Dynamic page ranges with ellipsis and responsive controls</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="p-4 rounded-xl border border-border/70 bg-card/60 flex flex-col items-center justify-center space-y-4">
            <div class="text-sm font-semibold">
              Currently Viewing Page <span class="font-bold text-primary">{{ activePage }}</span> of 12
            </div>

            <Pagination
              v-model="activePage"
              :total-pages="12"
              @change="(p) => showToast(`Switched to page ${p}`)"
            />
          </div>

          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>Dynamic sibling count calculation</span>
            <span>Supports up to thousands of records</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 4. TEXTEDITOR Showcase -->
    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <FileText class="h-4 w-4" />
          </div>
          <div>
            <CardTitle>Rich TextEditor</CardTitle>
            <CardDescription>
              Markdown-powered editor with formatting toolbar (Bold, Italic, Headings, Lists, Quotes, Code) and Live Preview
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <TextEditor
          v-model="sampleMarkdown"
          placeholder="Compose product details, release notes, or customer emails..."
          :rows="7"
        />

        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>Toggle between Edit (<Edit3 class="inline h-3 w-3" />) and Preview (<Eye class="inline h-3 w-3" />) in the top-right toolbar</span>
          <Button size="sm" variant="outline" @click="showToast('Editor content copied to clipboard!')">
            Copy Markdown
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
