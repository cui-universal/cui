<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Input,
  Textarea,
  Switch,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@cui-universal/vue";
import { Plus } from "lucide-vue-next";
import { useCommerce } from "~/composables/useCommerce";

const { addProduct } = useCommerce();

const isOpen = ref(false);
const isSaving = ref(false);

const form = ref({
  name: "",
  sku: "",
  price: "",
  stock: 25,
  category: "Electronics",
  description: "",
  inStock: true,
});

const handleSave = () => {
  if (!form.value.name.trim()) return;
  isSaving.value = true;
  setTimeout(() => {
    addProduct({
      name: form.value.name,
      sku: form.value.sku,
      price: form.value.price,
      stock: form.value.stock,
      category: form.value.category,
      description: form.value.description,
      inStock: form.value.inStock,
    });
    isSaving.value = false;
    isOpen.value = false;
    form.value = {
      name: "",
      sku: "",
      price: "",
      stock: 25,
      category: "Electronics",
      description: "",
      inStock: true,
    };
  }, 500);
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button size="sm" class="gap-1.5 shadow-sm shadow-primary/20">
        <Plus class="h-3.5 w-3.5" />
        <span>Add Product</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          Fill in inventory details. Published automatically to your public catalog.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 py-2">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-muted-foreground">Product Title</label>
          <Input v-model="form.name" placeholder="e.g. Mechanical Studio Keyboard" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-muted-foreground">Price (USD)</label>
            <Input v-model="form.price" placeholder="199.00" type="number" />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-muted-foreground">Initial Stock</label>
            <Input v-model="form.stock" placeholder="25" type="number" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-muted-foreground">SKU Code</label>
            <Input v-model="form.sku" placeholder="CUI-KB-09" />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-muted-foreground">Category</label>
            <Input v-model="form.category" placeholder="Electronics" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-muted-foreground">Description</label>
          <Textarea v-model="form.description" placeholder="Brief technical summary..." rows="2" />
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold">Enable for Instant Purchase</p>
            <p class="text-[10px] text-muted-foreground">Show in catalog as ready to ship</p>
          </div>
          <Switch v-model="form.inStock" />
        </div>
      </div>

      <DialogFooter class="gap-2">
        <DialogClose as-child>
          <Button variant="outline" size="sm">Cancel</Button>
        </DialogClose>
        <Button size="sm" :loading="isSaving" @click="handleSave">
          Save Product
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
