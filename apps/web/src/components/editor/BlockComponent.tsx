import { useState } from "react";
import { Block } from "../types";

interface BlockComponentProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
  onDelete: (blockId: string) => void;
}

export default function BlockComponent({
  block,
  onUpdate,
  onDelete,
}: BlockComponentProps) {
  const [content, setContent] = useState(block.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = { ...content, text: e.target.value };
    setContent(newContent);
    onUpdate(block.id, newContent);
  };

  return (
    <div className="block relative group">
      {block.type === "text" && (
        <textarea
          value={content.text || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Type something..."
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
