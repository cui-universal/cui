/**
 * Official Nuxt 3 module for @cui-universal/vue
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
];

export interface CUINuxtOptions {
  prefix?: string;
  injectStyles?: boolean;
}

export const cuiNuxtModule = {
  name: "@cui-universal/vue/nuxt",
  configKey: "cui",
  setup(options: CUINuxtOptions = {}, nuxt: any) {
    // 1. Inject @cui-universal/theme styles
    if (options.injectStyles !== false) {
      nuxt.options.css = nuxt.options.css || [];
      if (!nuxt.options.css.includes("@cui-universal/theme/styles.css")) {
        nuxt.options.css.unshift("@cui-universal/theme/styles.css");
      }
    }

    // 2. Auto-register all CUI components in Nuxt
    const prefix = options.prefix ?? "";
    nuxt.hook("components:extend", (componentsList: any[]) => {
      for (const name of CUI_COMPONENTS) {
        componentsList.push({
          name: `${prefix}${name}`,
          export: name,
          filePath: "@cui-universal/vue",
          global: true,
        });
      }
    });
  },
};

export default cuiNuxtModule;
