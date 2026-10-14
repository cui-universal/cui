import type { App, Plugin } from "vue";

import Button from "./Button.vue";
import Input from "./Input.vue";
import Badge from "./Badge.vue";
import Card from "./Card.vue";
import CardHeader from "./CardHeader.vue";
import CardTitle from "./CardTitle.vue";
import CardDescription from "./CardDescription.vue";
import CardContent from "./CardContent.vue";
import CardFooter from "./CardFooter.vue";
import Dialog from "./Dialog.vue";
import DialogTrigger from "./DialogTrigger.vue";
import DialogContent from "./DialogContent.vue";
import DialogHeader from "./DialogHeader.vue";
import DialogTitle from "./DialogTitle.vue";
import DialogDescription from "./DialogDescription.vue";
import DialogFooter from "./DialogFooter.vue";
import DialogClose from "./DialogClose.vue";
import Switch from "./Switch.vue";
import Avatar from "./Avatar.vue";
import AvatarImage from "./AvatarImage.vue";
import AvatarFallback from "./AvatarFallback.vue";
import Alert from "./Alert.vue";
import AlertTitle from "./AlertTitle.vue";
import AlertDescription from "./AlertDescription.vue";
import Tabs from "./Tabs.vue";
import TabsList from "./TabsList.vue";
import TabsTrigger from "./TabsTrigger.vue";
import TabsContent from "./TabsContent.vue";
import Checkbox from "./Checkbox.vue";
import Textarea from "./Textarea.vue";
import Separator from "./Separator.vue";
import Skeleton from "./Skeleton.vue";
import Accordion from "./Accordion.vue";
import AccordionItem from "./AccordionItem.vue";
import AccordionTrigger from "./AccordionTrigger.vue";
import AccordionContent from "./AccordionContent.vue";
import Tooltip from "./Tooltip.vue";
import TooltipProvider from "./TooltipProvider.vue";
import TooltipTrigger from "./TooltipTrigger.vue";
import TooltipContent from "./TooltipContent.vue";
import Progress from "./Progress.vue";
import Popover from "./Popover.vue";
import PopoverTrigger from "./PopoverTrigger.vue";
import PopoverContent from "./PopoverContent.vue";
import Select from "./Select.vue";
import SelectTrigger from "./SelectTrigger.vue";
import SelectValue from "./SelectValue.vue";
import SelectContent from "./SelectContent.vue";
import SelectGroup from "./SelectGroup.vue";
import SelectItem from "./SelectItem.vue";
import SelectLabel from "./SelectLabel.vue";
import SelectSeparator from "./SelectSeparator.vue";
import DropdownMenu from "./DropdownMenu.vue";
import DropdownMenuTrigger from "./DropdownMenuTrigger.vue";
import DropdownMenuContent from "./DropdownMenuContent.vue";
import DropdownMenuGroup from "./DropdownMenuGroup.vue";
import DropdownMenuItem from "./DropdownMenuItem.vue";
import DropdownMenuCheckboxItem from "./DropdownMenuCheckboxItem.vue";
import DropdownMenuRadioGroup from "./DropdownMenuRadioGroup.vue";
import DropdownMenuRadioItem from "./DropdownMenuRadioItem.vue";
import DropdownMenuLabel from "./DropdownMenuLabel.vue";
import DropdownMenuSeparator from "./DropdownMenuSeparator.vue";
import DropdownMenuShortcut from "./DropdownMenuShortcut.vue";
import DropdownMenuSub from "./DropdownMenuSub.vue";
import DropdownMenuSubTrigger from "./DropdownMenuSubTrigger.vue";
import DropdownMenuSubContent from "./DropdownMenuSubContent.vue";
import RadioGroup from "./RadioGroup.vue";
import RadioGroupItem from "./RadioGroupItem.vue";
import Kbd from "./Kbd.vue";
import Table from "./Table.vue";
import TableHeader from "./TableHeader.vue";
import TableBody from "./TableBody.vue";
import TableFooter from "./TableFooter.vue";
import TableRow from "./TableRow.vue";
import TableHead from "./TableHead.vue";
import TableCell from "./TableCell.vue";
import TableCaption from "./TableCaption.vue";

export {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Switch,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Checkbox,
  Textarea,
  Separator,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  RadioGroup,
  RadioGroupItem,
  Kbd,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};

export { cn } from "@cui-universal/theme";

export const components: Record<string, any> = {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Switch,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Checkbox,
  Textarea,
  Separator,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  RadioGroup,
  RadioGroupItem,
  Kbd,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};

export const CUIPlugin: Plugin = {
  install(app: App, options: { prefix?: string } = {}) {
    const prefix = options.prefix ?? "C";
    for (const [name, component] of Object.entries(components)) {
      app.component(`${prefix}${name}`, component);
    }
  },
};

export default CUIPlugin;
