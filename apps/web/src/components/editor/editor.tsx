"use client";

import { useState, useEffect } from "react";
import BlockComponent from "./BlockComponent";
import Toolbar from "./Toolbar";
import {
  createBlock,
  deleteBlock,
  updateBlock,
  updateDocument,
} from "@/utils/editor_socket";
import { Document } from "@/types/editor";

interface EditorProps {
  document: Document;
}

export default function Editor({ document }: EditorProps) {
  const [localDocument, setLocalDocument] = useState<Document>(document);

  useEffect(() => {
    setLocalDocument(document);
  }, [document]);

  const handleUpdateDocument = (title: string) => {
    updateDocument(document.id, { title });
  };

  const handleAddBlock = (type: string) => {
    const content = type === "text" ? { text: "" } : { url: "" };
    createBlock(document.id, { type, content });
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    updateBlock(document.id, blockId, { content });
  };

  const handleDeleteBlock = (blockId: string) => {
    deleteBlock(document.id, blockId);
  };

  return (
    <div className="editor">
      <input
        type="text"
        value={localDocument.title}
        onChange={(e) => handleUpdateDocument(e.target.value)}
        className="text-3xl font-bold mb-4 w-full"
      />
      <Toolbar onAddBlock={handleAddBlock} />
      <div className="blocks space-y-4">
        {localDocument.blocks.map((block) => (
          <BlockComponent
            key={block.id}
            block={block}
            onUpdate={handleUpdateBlock}
            onDelete={handleDeleteBlock}
            onAddBlock={handleAddBlock}
          />
        ))}
      </div>
    </div>
  );
}
