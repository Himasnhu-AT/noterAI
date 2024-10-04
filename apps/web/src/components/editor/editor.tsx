"use client";

import React, { useEffect, useState } from "react";
import { BlockNoteView } from "@blocknote/mantine"; // Import BlockNote view
import { useCreateBlockNote } from "@blocknote/react"; // Import BlockNote hook
import "@blocknote/core/fonts/inter.css"; // Import BlockNote fonts
import "@blocknote/mantine/style.css"; // Import your custom styles for the editor

interface EditorProps {
  document: {
    id: string;
    title: string;
    blocks: any[]; // Assume blocks are of any type for now
  };
}

export default function Editor({ document }: EditorProps) {
  const [localDocument, setLocalDocument] = useState(document);

  // Initialize BlockNote editor
  const editor = useCreateBlockNote();

  useEffect(() => {
    setLocalDocument(document);
  }, [document]);

  // Handle document updates (commented out existing code)
  // const handleUpdateDocument = (title: string) => {
  //   updateDocument(document.id, { title });
  // };

  // Handle adding blocks (commented out existing code)
  // const handleAddBlock = (type: string) => {
  //   const content = type === "text" ? { text: "" } : { url: "" };
  //   createBlock(document.id, { type, content });
  // };

  // Handle updating blocks (commented out existing code)
  // const handleUpdateBlock = (blockId: string, content: any) => {
  //   updateBlock(document.id, blockId, { content });
  // };

  // Handle deleting blocks (commented out existing code)
  // const handleDeleteBlock = (blockId: string) => {
  //   deleteBlock(document.id, blockId);
  // };

  return (
    <div className="editor">
      <input
        type="text"
        value={localDocument.title}
        // onChange={(e) => handleUpdateDocument(e.target.value)} // Commented out
        className="text-3xl font-bold mb-4 w-full"
        placeholder="Document Title"
      />
      {/* Render BlockNote editor */}
      <BlockNoteView
        editor={editor} // Attach the BlockNote editor
        data-theming-css-variables-demo
        theme="light"
        className="flex-grow bn-container overflow-auto p-0 pt-4 pb-4"
      />
      <div className="blocks space-y-4">
        {/* Commented out existing block rendering */}
        {/* {localDocument.blocks.map((block) => (
          <BlockComponent
            key={block.id}
            block={block}
            onUpdate={handleUpdateBlock}
            onDelete={handleDeleteBlock}
            onAddBlock={handleAddBlock}
          />
        ))} */}
      </div>
    </div>
  );
}
