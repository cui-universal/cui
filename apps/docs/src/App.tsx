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

function DocsLayout() {
  const { currentSection } = useDocs();
  const ActiveSectionComponent = SECTION_COMPONENTS[currentSection] || IntroSection;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/25 selection:text-primary">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 py-8 md:pl-10 overflow-y-auto">
          <ActiveSectionComponent />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DocsProvider>
      <TooltipProvider>
        <DocsLayout />
      </TooltipProvider>
    </DocsProvider>
  );
}
