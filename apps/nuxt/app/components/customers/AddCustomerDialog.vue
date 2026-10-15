<script setup lang="ts">
import { ref } from "vue";
import { useCommerce } from "~/composables/useCommerce";
import type { CustomerStatus } from "~/types/commerce";

const { addCustomer, showToast } = useCommerce();

const isOpen = ref(false);
const isSaving = ref(false);
const errorMessage = ref("");

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "San Francisco, CA",
  status: "Active" as CustomerStatus,
  paymentMethod: "Visa •••• 4242",
  avatar: "",
};

const form = ref({ ...initialForm });

const statusOptions: { value: CustomerStatus; label: string; desc: string }[] = [
  { value: "Active", label: "Active", desc: "Standard active purchasing account" },
  { value: "VIP", label: "VIP Tier", desc: "High priority tier (>$2,000 spend)" },
  { value: "New", label: "New Lead", desc: "Recently registered account" },
  { value: "Inactive", label: "Inactive", desc: "No recent purchase activity" },
];

const resetForm = () => {
  form.value = { ...initialForm };
  errorMessage.value = "";
};

const handleSave = () => {
  if (!form.value.name.trim()) {
    errorMessage.value = "Customer name is required";
    showToast("Please provide customer name");
    return;
  }
  if (!form.value.email.trim() || !form.value.email.includes("@")) {
    errorMessage.value = "Valid email address is required";
    showToast("Please provide a valid email");
    return;
  }

  isSaving.value = true;
  errorMessage.value = "";

  try {
    addCustomer({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone || undefined,
      location: form.value.location || "San Francisco, CA",
      status: form.value.status,
      paymentMethod: form.value.paymentMethod || "Visa •••• 4242",
      avatar: form.value.avatar || "",
    });

    isSaving.value = false;
    isOpen.value = false;
    resetForm();
  } catch (err: any) {
    isSaving.value = false;
    errorMessage.value = err?.message || "Failed to add customer";
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button size="sm" class="gap-1.5 shadow-sm shadow-primary/20" @click="isOpen = true">
        <Icon name="lucide:user-plus" class="h-3.5 w-3.5" />
        <span>Add Customer</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogDescription>
          Create a verified customer profile in your commerce directory.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSave" class="space-y-4 py-2">
        <!-- Full Name -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Full Name <span class="text-destructive">*</span></span>
            <span v-if="errorMessage" class="text-[11px] text-destructive font-normal">{{ errorMessage }}</span>
          </label>
          <Input
            v-model="form.name"
            placeholder="e.g. Maya Lin"
            :class="{ 'border-destructive ring-1 ring-destructive': errorMessage }"
            required
            autofocus
          />
        </div>

        <!-- Email & Phone -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">
              Email Address <span class="text-destructive">*</span>
            </label>
            <Input
              v-model="form.email"
              type="email"
              placeholder="e.g. maya.lin@design.co"
              required
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Phone Number</label>
            <Input
              v-model="form.phone"
              type="tel"
              placeholder="+1 (555) 234-5678"
            />
          </div>
        </div>

        <!-- Location & Payment Method -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Location</label>
            <Input
              v-model="form.location"
              placeholder="e.g. New York, NY"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Payment Method</label>
            <Input
              v-model="form.paymentMethod"
              placeholder="e.g. Apple Pay, Visa •••• 4242"
            />
          </div>
        </div>

        <!-- Account Tier / Status -->
        <div class="space-y-2">
          <label class="text-xs font-semibold text-foreground">Customer Tier / Status</label>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="opt in statusOptions"
              :key="opt.value"
              @click="form.status = opt.value"
              :class="[
                'p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-0.5',
                form.status === opt.value
                  ? 'border-primary bg-primary/10 shadow-xs'
                  : 'border-border/80 bg-secondary/30 hover:border-border'
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-foreground">{{ opt.label }}</span>
                <Icon
                  v-if="form.status === opt.value"
                  name="lucide:check-circle-2"
                  class="h-3.5 w-3.5 text-primary"
                />
              </div>
              <span class="text-[10px] text-muted-foreground leading-tight">{{ opt.desc }}</span>
            </div>
          </div>
        </div>

        <!-- Avatar Image URL (Optional) -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Avatar Image URL (Optional)</label>
          <Input
            v-model="form.avatar"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <DialogFooter class="gap-2 pt-2">
          <DialogClose as-child>
            <Button variant="outline" size="sm" type="button" @click="() => { resetForm(); isOpen = false; }">
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm" type="submit" :loading="isSaving" class="gap-1.5">
            <Icon name="lucide:check" class="h-3.5 w-3.5" />
            <span>Create Profile</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
