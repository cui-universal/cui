<script setup lang="ts">
import { ref } from "vue";
import { Check, RotateCcw, Palette, Sparkles, Sun, Moon } from "lucide-vue-next";
import { useCommerce } from "~/composables/useCommerce";
import { useTheme } from "~/composables/useTheme";

const { showToast } = useCommerce();
const {
  isDark,
  currentColorName,
  currentRadius,
  colorPalettes,
  radiusPresets,
  setPrimaryColor,
  setRadius,
  toggleDarkMode,
  resetTheme,
} = useTheme();

const autoFulfill = ref(true);
const lowStockAlert = ref(true);
const internationalShipping = ref(false);

useHead({
  title: "Store Settings & Theme Customizer - CUI Commerce Admin",
});
</script>

<template>
  <div class="max-w-3xl space-y-8">
    <div>
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Settings & Appearance</h1>
      <p class="text-xs sm:text-sm text-muted-foreground">
        Customize your dashboard theme colors, border radius, and store preferences.
      </p>
    </div>

    <!-- 1. Appearance & Theme Customizer Card -->
    <Card class="border-border/80 shadow-sm">
      <CardHeader>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Palette class="h-4 w-4" />
            </div>
            <div>
              <CardTitle>Theme & Appearance</CardTitle>
              <CardDescription>Customize the primary brand color and component corner radius in real-time</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" @click="resetTheme" class="h-8 text-xs gap-1.5 text-muted-foreground">
            <RotateCcw class="h-3 w-3" />
            <span>Reset</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- Primary Color Selector -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-muted-foreground">Primary Accent Color</label>
            <span class="text-xs font-mono font-bold text-primary">{{ currentColorName }}</span>
          </div>

          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            <button
              v-for="palette in colorPalettes"
              :key="palette.name"
              type="button"
              @click="setPrimaryColor(palette.name)"
              :class="[
                'flex items-center gap-2 p-2 rounded-xl border transition-all duration-200 cursor-pointer text-left',
                currentColorName === palette.name
                  ? 'border-primary ring-2 ring-primary/20 bg-secondary/80'
                  : 'border-border/70 hover:border-border hover:bg-secondary/40',
              ]"
            >
              <span :class="['h-4 w-4 rounded-full shrink-0 shadow-xs flex items-center justify-center text-white', palette.bgClass]">
                <Check v-if="currentColorName === palette.name" class="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span class="text-xs font-medium truncate">{{ palette.name }}</span>
            </button>
          </div>
        </div>

        <!-- Border Radius Selector -->
        <div class="space-y-3 pt-4 border-t border-border/60">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-muted-foreground">Component Corner Radius</label>
            <span class="text-xs font-mono font-bold text-primary">{{ currentRadius }}</span>
          </div>

          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="preset in radiusPresets"
              :key="preset.value"
              type="button"
              @click="setRadius(preset.value)"
              :class="[
                'py-2 px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-0.5',
                currentRadius === preset.value
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/10 text-primary font-bold'
                  : 'border-border/70 hover:bg-secondary/40 text-muted-foreground hover:text-foreground',
              ]"
            >
              <span class="text-xs font-mono">{{ preset.label }}</span>
              <span class="text-[9px] uppercase tracking-wider opacity-70">{{ preset.desc }}</span>
            </button>
          </div>
        </div>

        <!-- Live Component Preview -->
        <div class="p-4 rounded-2xl border border-border/80 bg-secondary/30 space-y-3">
          <div class="flex items-center gap-2">
            <Sparkles class="h-3.5 w-3.5 text-primary" />
            <span class="text-xs font-semibold">Live Component Preview</span>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <Button size="sm">Primary Action</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="outline" size="sm">Outline Button</Button>
            <Badge variant="default">Theme Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
          </div>
        </div>

        <!-- Dark / Light Mode Toggle Row -->
        <div class="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-secondary/30">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-lg bg-background flex items-center justify-center border border-border shadow-xs">
              <Sun v-if="isDark" class="h-4 w-4 text-amber-400" />
              <Moon v-else class="h-4 w-4 text-indigo-500" />
            </div>
            <div>
              <p class="text-xs font-semibold">Color Scheme</p>
              <p class="text-[10px] text-muted-foreground">{{ isDark ? "Dark theme active" : "Light theme active" }}</p>
            </div>
          </div>
          <Switch :model-value="isDark" @update:checked="toggleDarkMode" />
        </div>
      </CardContent>
    </Card>

    <!-- 2. Checkout & Store Preferences Card -->
    <Card class="border-border/80 shadow-sm">
      <CardHeader>
        <CardTitle>Checkout & Ordering</CardTitle>
        <CardDescription>Adjust online shopping rules and inventory notifications</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">Automatic Order Fulfillment</p>
            <p class="text-[10px] text-muted-foreground">Send digital keys or dispatch warehouse immediately on payment</p>
          </div>
          <Switch v-model="autoFulfill" />
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">Low Stock Email Alerts</p>
            <p class="text-[10px] text-muted-foreground">Receive digest when product quantity drops below 5 units</p>
          </div>
          <Switch v-model="lowStockAlert" />
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">International Shipping Rates</p>
            <p class="text-[10px] text-muted-foreground">Enable worldwide rate calculations at checkout</p>
          </div>
          <Switch v-model="internationalShipping" />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" @click="showToast('Preferences saved successfully!')">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
