import { useState } from "react";

interface DropDownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function DropDown({ options, onSelect }: DropDownProps) {
  return (
    <div className="absolute bg-white border rounded shadow-md mt-2 z-10">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => onSelect(option)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
        >
          {option}
        </div>
      ))}
    </div>
  );
}
