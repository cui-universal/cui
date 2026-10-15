/**
 * Official Nuxt 4 & Nuxt 3 module for @cui-universal/vue
 * Automatically injects theme styles and auto-registers all CUI components in Nuxt.
 */

const CUI_COMPONENTS = [
  "Button",
  "Input",
  "Badge",
  "Card",
  "CardHeader",
  "CardTitle",
  "CardDescription",
  "CardContent",
  "CardFooter",
  "Dialog",
  "DialogTrigger",
  "DialogContent",
  "DialogHeader",
  "DialogTitle",
  "DialogDescription",
  "DialogFooter",
  "DialogClose",
  "Switch",
  "Avatar",
  "AvatarImage",
  "AvatarFallback",
  "Alert",
  "AlertTitle",
  "AlertDescription",
  "Tabs",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "Checkbox",
  "Textarea",
  "Separator",
  "Skeleton",
  "Accordion",
  "AccordionItem",
  "AccordionTrigger",
  "AccordionContent",
  "Tooltip",
  "TooltipProvider",
  "TooltipTrigger",
  "TooltipContent",
  "Progress",
  "Popover",
  "PopoverTrigger",
  "PopoverContent",
  "Select",
  "SelectTrigger",
  "SelectValue",
  "SelectContent",
  "SelectGroup",
  "SelectItem",
  "SelectLabel",
  "SelectSeparator",
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
  "RadioGroup",
  "RadioGroupItem",
  "Kbd",
  "Table",
  "TableHeader",
  "TableBody",
  "TableFooter",
  "TableRow",
  "TableHead",
  "TableCell",
  "TableCaption",
  "Steps",
  "DatePicker",
  "TextEditor",
  "Breadcrumb",
  "BreadcrumbItem",
  "BreadcrumbLink",
  "BreadcrumbSeparator",
  "Pagination",
  "Timeline",
  "Rating",
  "EmptyState",
  "ColorPicker",
  "InputNumber",
  "NumberInput",
];

export interface CUINuxtOptions {
  prefix?: string;
  injectStyles?: boolean;
}

export function cuiNuxtModule(this: any, inlineOptions: CUINuxtOptions = {}, nuxt?: any) {
  const nuxtInstance = nuxt || (this ? this.nuxt : undefined);
  const configOptions = nuxtInstance?.options?.cui || {};
  const options: CUINuxtOptions = {
    prefix: "",
    injectStyles: true,
    ...configOptions,
    ...inlineOptions,
  };

  if (!nuxtInstance) return;

  // 1. Inject @cui-universal/theme styles
  if (options.injectStyles !== false) {
    nuxtInstance.options.css = nuxtInstance.options.css || [];
    if (!nuxtInstance.options.css.includes("@cui-universal/theme/styles.css")) {
      nuxtInstance.options.css.unshift("@cui-universal/theme/styles.css");
    }
  }

  // 2. Auto-register all CUI components in Nuxt
  const prefix = options.prefix ?? "";
  const toKebabCase = (str: string) =>
    str
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
      .toLowerCase();

  nuxtInstance.hook("components:extend", (componentsList: any[]) => {
    for (const name of CUI_COMPONENTS) {
      const pascalName = `${prefix}${name}`;
      const kebabName = toKebabCase(pascalName);
      componentsList.push({
        name: pascalName,
        pascalName,
        kebabName,
        chunkName: `components/${kebabName}`,
        shortPath: `components/${kebabName}`,
        export: name,
        filePath: "@cui-universal/vue",
        global: true,
        mode: "all",
      });
    }
  });
}

cuiNuxtModule.getMeta = () => ({
  name: "@cui-universal/vue/nuxt",
  configKey: "cui",
  compatibility: {
    nuxt: ">=3.0.0 || >=4.0.0",
  },
});
(cuiNuxtModule as any).meta = {
  name: "@cui-universal/vue/nuxt",
  configKey: "cui",
  compatibility: {
    nuxt: ">=3.0.0 || >=4.0.0",
  },
};
(cuiNuxtModule as any).configKey = "cui";
(cuiNuxtModule as any).default = cuiNuxtModule;
(cuiNuxtModule as any).cuiNuxtModule = cuiNuxtModule;

export default cuiNuxtModule;
