import React from "react";
import { TooltipProvider } from "@cui-universal/react";
import { DocsProvider, useDocs } from "./context/DocsContext";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import {
  IntroSection,
  InstallationSection,
  ThemingSection,
  ButtonSection,
  InputSection,
  TextareaSection,
  CheckboxSection,
  SwitchSection,
  SelectSection,
  RadioSection,
  CardSection,
  TabsSection,
  AccordionSection,
  SeparatorSection,
  TableSection,
  AlertSection,
  BadgeSection,
  ProgressSection,
  SkeletonSection,
  TooltipSection,
  KbdSection,
  DialogSection,
  PopoverSection,
  DropdownSection,
  AvatarSection,
  DatePickerSection,
  TextEditorSection,
  RatingSection,
  ColorPickerSection,
  InputNumberSection,
  StepsSection,
  BreadcrumbSection,
  PaginationSection,
  TimelineSection,
  EmptyStateSection,
} from "./sections";
import type { Section } from "./types";

const SECTION_COMPONENTS: Record<Section, React.ComponentType> = {
  intro: IntroSection,
  installation: InstallationSection,
  theming: ThemingSection,
  button: ButtonSection,
  input: InputSection,
  textarea: TextareaSection,
  checkbox: CheckboxSection,
  switch: SwitchSection,
  select: SelectSection,
  radio: RadioSection,
  datepicker: DatePickerSection,
  texteditor: TextEditorSection,
  rating: RatingSection,
  colorpicker: ColorPickerSection as any,
  "color-picker": ColorPickerSection,
  inputnumber: InputNumberSection as any,
  "input-number": InputNumberSection,
  card: CardSection,
  tabs: TabsSection,
  accordion: AccordionSection,
  separator: SeparatorSection,
  table: TableSection,
  steps: StepsSection,
  breadcrumb: BreadcrumbSection,
  pagination: PaginationSection,
  timeline: TimelineSection,
  alert: AlertSection,
  badge: BadgeSection,
  progress: ProgressSection,
  skeleton: SkeletonSection,
  tooltip: TooltipSection,
  kbd: KbdSection,
  "empty-state": EmptyStateSection,
  dialog: DialogSection,
  popover: PopoverSection,
  dropdown: DropdownSection,
  avatar: AvatarSection,
};

import { NAV_GROUPS } from "./data/navigation";
import { ChevronRight, PanelLeft } from "lucide-react";

function DocsLayout() {
  const { currentSection, setMobileMenuOpen } = useDocs();
  const ActiveSectionComponent = SECTION_COMPONENTS[currentSection] || IntroSection;

  const activeNavItem = React.useMemo(() => {
    for (const group of NAV_GROUPS) {
      const found = group.items.find((item) => item.id === currentSection);
      if (found) {
        return { ...found, category: group.category };
      }
    }
    return { id: "intro", label: "Introduction", category: "Getting Started" };
  }, [currentSection]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/25 selection:text-primary">
      <Header />

      {/* Mobile Sub-Header Navigation Sticky Bar (Visible on < md) */}
      <div className="md:hidden sticky top-16 z-30 w-full border-b border-border/70 bg-background/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 text-xs min-w-0">
          <span className="text-muted-foreground truncate">{activeNavItem.category}</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" />
          <span className="font-bold text-foreground truncate">{activeNavItem.label}</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary/80 hover:bg-secondary text-foreground border border-border/70 transition-all shrink-0 active:scale-95 shadow-2xs"
          aria-label="Open components navigation drawer"
        >
          <PanelLeft className="h-3.5 w-3.5 text-primary" />
          <span>Menu</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col md:flex-row md:items-start min-w-0">
        <Sidebar />
        <main className="flex-1 py-6 sm:py-8 md:pl-10 min-w-0 max-w-full">
          <ActiveSectionComponent />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DocsProvider>
      <TooltipProvider delayDuration={200}>
        <DocsLayout />
      </TooltipProvider>
    </DocsProvider>
  );
}
