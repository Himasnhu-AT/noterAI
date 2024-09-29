import { useState } from "react";
import { Document, Block } from "../types";
import BlockComponent from "./BlockComponent";
import Toolbar from "./Toolbar";
import {
  updateDocument,
  createBlock,
  updateBlock,
  deleteBlock,
} from "../utils/api";

interface EditorProps {
  initialDocument: Document;
}

export default function Editor({ initialDocument }: EditorProps) {
  const [document, setDocument] = useState<Document>(initialDocument);

  const handleUpdateDocument = async (title: string) => {
    try {
      const updatedDoc = await updateDocument(document.id, { title });
      setDocument(updatedDoc);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleAddBlock = async (type: string) => {
    try {
      const newBlock = await createBlock(document.id, { type, content: {} });
      setDocument({
        ...document,
        blocks: [...document.blocks, newBlock],
      });
    } catch (error) {
      console.error("Error adding block:", error);
    }
  };

  const handleUpdateBlock = async (blockId: string, content: any) => {
    try {
      const updatedBlock = await updateBlock(document.id, blockId, { content });
      setDocument({
        ...document,
        blocks: document.blocks.map((block) =>
          block.id === blockId ? updatedBlock : block,
        ),
      });
    } catch (error) {
      console.error("Error updating block:", error);
    }
  };

  const handleDeleteBlock = async (blockId: string) => {
    try {
      await deleteBlock(document.id, blockId);
      setDocument({
        ...document,
        blocks: document.blocks.filter((block) => block.id !== blockId),
      });
    } catch (error) {
      console.error("Error deleting block:", error);
    }
  };

  return (
    <div className="editor">
      <input
        type="text"
        value={document.title}
        onChange={(e) => handleUpdateDocument(e.target.value)}
        className="text-3xl font-bold mb-4 w-full"
      />
      <Toolbar onAddBlock={handleAddBlock} />
      <div className="blocks space-y-4">
        {document.blocks.map((block) => (
          <BlockComponent
            key={block.id}
            block={block}
            onUpdate={handleUpdateBlock}
            onDelete={handleDeleteBlock}
          />
        ))}
      </div>
    </div>
  );
}
