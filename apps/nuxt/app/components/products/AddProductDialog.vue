<script setup lang="ts">
import { ref } from "vue";
import { useCommerce } from "~/composables/useCommerce";

const { addProduct, showToast } = useCommerce();

const isOpen = ref(false);
const isSaving = ref(false);
const errorMessage = ref("");

const initialForm = {
  name: "",
  sku: "",
  price: 149.99,
  stock: 20,
  category: "Electronics",
  description: "",
  inStock: true,
};

const form = ref({ ...initialForm });

const resetForm = () => {
  form.value = { ...initialForm };
  errorMessage.value = "";
};

const handleSave = () => {
  if (!form.value.name.trim()) {
    errorMessage.value = "Product name is required";
    showToast("Please provide a product name");
    return;
  }

  isSaving.value = true;
  errorMessage.value = "";

  try {
    addProduct({
      name: form.value.name,
      sku: form.value.sku || undefined,
      price: form.value.price,
      stock: form.value.stock,
      category: form.value.category,
      description: form.value.description,
      inStock: form.value.inStock,
    });

    isSaving.value = false;
    isOpen.value = false;
    resetForm();
  } catch (err: any) {
    isSaving.value = false;
    errorMessage.value = err?.message || "Failed to save product";
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button size="sm" class="gap-1.5 shadow-sm shadow-primary/20" @click="isOpen = true">
        <Icon name="lucide:plus" class="h-3.5 w-3.5" />
        <span>Add Product</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          Create and publish a new item into your live catalog.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSave" class="space-y-4 py-2">
        <!-- Name -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Product Title <span class="text-destructive">*</span></span>
            <span v-if="errorMessage" class="text-[11px] text-destructive font-normal">{{ errorMessage }}</span>
          </label>
          <Input
            v-model="form.name"
            placeholder="e.g. Mechanical Studio Keyboard"
            :class="{ 'border-destructive ring-1 ring-destructive': errorMessage }"
            required
            autofocus
          />
        </div>

        <!-- Price & Stock -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Price (USD)</label>
            <InputNumber
              v-model="form.price"
              placeholder="149.99"
              :min="0"
              :step="5"
              :precision="2"
              prefix="$"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Initial Inventory Stock</label>
            <InputNumber
              v-model="form.stock"
              placeholder="20"
              :min="0"
              :step="1"
            />
          </div>
        </div>

        <!-- SKU & Category -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">SKU Code</label>
            <Input v-model="form.sku" placeholder="e.g. CUI-KB-09" />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Category</label>
            <Input v-model="form.category" placeholder="e.g. Electronics, Audio, Workspace" />
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Product Description</label>
          <Textarea
            v-model="form.description"
            placeholder="Write key specifications, materials, warranty, or packaging details..."
            :rows="3"
          />
        </div>

        <!-- Availability Toggle -->
        <div class="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30">
          <div>
            <p class="text-xs font-semibold text-foreground">Instant Storefront Availability</p>
            <p class="text-[10px] text-muted-foreground">Show in online catalog as active for ordering</p>
          </div>
          <Switch v-model="form.inStock" />
        </div>

        <DialogFooter class="gap-2 pt-2">
          <DialogClose as-child>
            <Button variant="outline" size="sm" type="button" @click="() => { resetForm(); isOpen = false; }">
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm" type="submit" :loading="isSaving" class="gap-1.5">
            <Icon name="lucide:check" class="h-3.5 w-3.5" />
            <span>Save Product</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
