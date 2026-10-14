import { tv, type VariantProps } from "tailwind-variants";

export const tableVariants = tv({
  base: "w-full caption-bottom text-sm border-collapse",
});

export const tableHeaderVariants = tv({
  base: "[&_tr]:border-b bg-muted/30",
});

export const tableBodyVariants = tv({
  base: "[&_tr:last-child]:border-0",
});

export const tableFooterVariants = tv({
  base: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
});

export const tableRowVariants = tv({
  base: "border-b border-border transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted",
});

export const tableHeadVariants = tv({
  base: "h-10 px-4 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0",
});

export const tableCellVariants = tv({
  base: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
});

export const tableCaptionVariants = tv({
  base: "mt-4 text-sm text-muted-foreground",
});

export type TableVariants = VariantProps<typeof tableVariants>;
