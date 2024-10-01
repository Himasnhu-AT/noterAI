import { Document, Block } from "@/types/editor";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// export const fetchDocument = async (id: string): Promise<Document> => {
//   const response = await axios.get(`${API_URL}/documents/${id}`);
//   return response.data as Document;
// };

// export const updateDocument = async (
//   id: string,
//   data: Partial<Document>,
// ): Promise<Document> => {
//   const response = await axios.patch(`${API_URL}/documents/${id}`, data);
//   return response.data;
// };

// export const createBlock = async (
//   documentId: string,
//   data: Partial<Block>,
// ): Promise<Block> => {
//   const response = await axios.post(
//     `${API_URL}/documents/${documentId}/blocks`,
//     data,
//   );
//   return response.data;
// };

// export const updateBlock = async (
//   documentId: string,
//   blockId: string,
//   data: Partial<Block>,
// ): Promise<Block> => {
//   const response = await axios.patch(
//     `${API_URL}/documents/${documentId}/blocks/${blockId}`,
//     data,
//   );
//   return response.data;
// };

// export const deleteBlock = async (
//   documentId: string,
//   blockId: string,
// ): Promise<void> => {
//   await axios.delete(`${API_URL}/documents/${documentId}/blocks/${blockId}`);
// };

/*
 * @Demo: api simulation
 *
 */

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initialize local storage with a sample document if it doesn't exist
const initializeStorage = () => {
  if (typeof window !== "undefined" && !localStorage.getItem("document")) {
    const initialDocument: Document = {
      id: generateId(),
      title: "Untitled Document",
      blocks: [
        {
          id: generateId(),
          type: "text",
          content: { text: "Welcome to your new document!" },
        },
      ],
    };
    localStorage.setItem("document", JSON.stringify(initialDocument));
  }
};

// Simulate delay to mimic API call latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDocument = async (id: string): Promise<Document> => {
  initializeStorage();
  await delay(300); // Simulate network delay
  const document = localStorage.getItem("document");
  if (!document) {
    throw new Error("Document not found");
  }
  return JSON.parse(document);
};

export const updateDocument = async (
  id: string,
  data: Partial<Document>,
): Promise<Document> => {
  await delay(300);
  const document = await fetchDocument(id);
  const updatedDocument = { ...document, ...data };
  localStorage.setItem("document", JSON.stringify(updatedDocument));
  return updatedDocument;
};

export const createBlock = async (
  documentId: string,
  data: Partial<Block>,
): Promise<Block> => {
  await delay(300);
  const document = await fetchDocument(documentId);
  const newBlock: Block = {
    id: generateId(),
    type: data.type || "text",
    content: data.content || {},
  };
  document.blocks.push(newBlock);
  localStorage.setItem("document", JSON.stringify(document));
  return newBlock;
};

export const updateBlock = async (
  documentId: string,
  blockId: string,
  data: Partial<Block>,
): Promise<Block> => {
  await delay(300);
  const document = await fetchDocument(documentId);
  const blockIndex = document.blocks.findIndex((block) => block.id === blockId);
  if (blockIndex === -1) {
    throw new Error("Block not found");
  }
  const updatedBlock = { ...document.blocks[blockIndex], ...data };
  document.blocks[blockIndex] = updatedBlock;
  localStorage.setItem("document", JSON.stringify(document));
  return updatedBlock;
};

export const deleteBlock = async (
  documentId: string,
  blockId: string,
): Promise<void> => {
  await delay(300);
  const document = await fetchDocument(documentId);
  document.blocks = document.blocks.filter((block) => block.id !== blockId);
  localStorage.setItem("document", JSON.stringify(document));
};
