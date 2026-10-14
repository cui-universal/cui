import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@cui-universal/react";

interface PlaygroundSelectProps {
  id?: string;
  value: string;
  onValueChange: (val: string) => void;
  options: { value: string; label: string }[];
}

export function PlaygroundSelect({
  id,
  value,
  onValueChange,
  options,
}: PlaygroundSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} size="sm" className="w-full text-xs h-8">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
