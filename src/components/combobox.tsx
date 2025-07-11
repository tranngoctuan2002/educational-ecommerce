"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem } from "./ui/command";

export type ComboBoxData = {
  value: string;
  label: string;
};

type Props = {
  isSearch?: boolean;
  title: string;
  initialData?: ComboBoxData;
  data: ComboBoxData[];
};

const Combobox = ({ isSearch, data, initialData, title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    initialData ? initialData.value : ""
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            className="w-[100%] justify-between"
          >
            {data
              ? data.find((d) => d.value === selected)?.label
              : initialData?.label}
            <ChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100%] p-0">
          <Command>
            {isSearch && (
              <CommandInput>Không ${title} được tìm thấy</CommandInput>
            )}
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.value}
                  value={d.value}
                  onSelect={(currentValue) => {
                    setSelected(currentValue === selected ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {d.label}
                  <Check
                    className={`ml-auto 
                    ${selected === d.value ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Combobox;
