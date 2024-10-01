import { Block } from "@/types/editor";
import { useState, useRef, useEffect } from "react";
import DropDown from "./DropDown";

interface BlockComponentProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
  onDelete: (blockId: string) => void;
  onAddBlock: (type: string) => void;
}

export default function BlockComponent({
  block,
  onUpdate,
  onDelete,
  onAddBlock,
}: BlockComponentProps) {
  const [content, setContent] = useState(block.content);
  const [showDropDown, setShowDropDown] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newContent = {
      ...content,
      [block.type === "text" ? "text" : "url"]: e.target.value,
    };
    setContent(newContent);
    onUpdate(block.id, newContent);

    if (block.type === "text" && e.target.value.startsWith("/")) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  };

  const handleSelect = (option: string) => {
    setShowDropDown(false);
    onAddBlock(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textAreaRef.current &&
        !textAreaRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="block relative group">
      {block.type === "text" && (
        <textarea
          ref={textAreaRef}
          value={content.text || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Type something..."
        />
      )}
      {(block.type === "image" || block.type === "video") && (
        <input
          type="text"
          value={content.url || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder={`Enter ${block.type} URL...`}
        />
      )}
      {showDropDown && (
        <DropDown
          options={["text", "image", "video"]}
          onSelect={handleSelect}
        />
      )}
      <button
        onClick={() => onDelete(block.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
