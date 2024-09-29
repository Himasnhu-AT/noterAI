import axios from "axios";
import { Document, Block } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchDocument = async (id: string): Promise<Document> => {
  const response = await axios.get(`${API_URL}/documents/${id}`);
  return response.data;
};

export const updateDocument = async (
  id: string,
  data: Partial<Document>,
): Promise<Document> => {
  const response = await axios.patch(`${API_URL}/documents/${id}`, data);
  return response.data;
};

export const createBlock = async (
  documentId: string,
  data: Partial<Block>,
): Promise<Block> => {
  const response = await axios.post(
    `${API_URL}/documents/${documentId}/blocks`,
    data,
  );
  return response.data;
};

export const updateBlock = async (
  documentId: string,
  blockId: string,
  data: Partial<Block>,
): Promise<Block> => {
  const response = await axios.patch(
    `${API_URL}/documents/${documentId}/blocks/${blockId}`,
    data,
  );
  return response.data;
};

export const deleteBlock = async (
  documentId: string,
  blockId: string,
): Promise<void> => {
  await axios.delete(`${API_URL}/documents/${documentId}/blocks/${blockId}`);
};
