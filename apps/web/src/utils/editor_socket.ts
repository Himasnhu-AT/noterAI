// import { io, Socket } from "socket.io-client";
// import { Document, Block } from "@/types/editor";

// let socket: Socket;

// export const initializeSocket = (): Socket => {
//   if (!socket) {
//     socket = io(process.env.NEXT_PUBLIC_CONTENT_MGMT_PORT);
//   }
//   return socket;
// };

// export const fetchDocument = (documentId: string): Promise<Document> => {
//   return new Promise((resolve, reject) => {
//     socket.emit("fetchDocument", documentId, (response: Document | Error) => {
//       if ("message" in response) {
//         reject(response);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };

// export const updateDocument = (
//   documentId: string,
//   data: Partial<Document>,
// ): void => {
//   socket.emit("updateDocument", { documentId, data });
// };

// export const createBlock = (documentId: string, data: Partial<Block>): void => {
//   socket.emit("createBlock", { documentId, data });
// };

// export const updateBlock = (
//   documentId: string,
//   blockId: string,
//   data: Partial<Block>,
// ): void => {
//   socket.emit("updateBlock", { documentId, blockId, data });
// };

// export const deleteBlock = (documentId: string, blockId: string): void => {
//   socket.emit("deleteBlock", { documentId, blockId });
// };

import { Document, Block } from "@/types/editor";

// Mock data
// const mockDocuments: Document[] = [
//   {
//     id: "example-document-id",
//     title: "Sample Document 1",
//     blocks: [
//       {
//         id: "block1",
//         type: "text",
//         content: { text: "This is a sample block." },
//       },
//       {
//         id: "block2",
//         type: "image",
//         content: { url: "https://example.com/image.jpg" },
//       },
//       {
//         id: "block3",
//         type: "video",
//         content: { url: "https://example.com/video.mp4" },
//       },
//     ],
//   },
//   {
//     id: "example-document-id-2",
//     title: "Sample Document 2",
//     blocks: [
//       {
//         id: "block4",
//         type: "text",
//         content: { text: "Another sample block." },
//       },
//     ],
//   },
// ];

const mockDocuments: { [key: string]: Document } = {
  "example-document-id": {
    id: "example-document-id",
    title: "Sample Document 1",
    blocks: [
      {
        id: "block1",
        type: "text",
        content: { text: "This is a sample block." },
      },
      {
        id: "block2",
        type: "image",
        content: { url: "https://example.com/image.jpg" },
      },
      {
        id: "block3",
        type: "video",
        content: { url: "https://example.com/video.mp4" },
      },
    ],
  },
  doc2: {
    id: "example-document-id-2",
    title: "Sample Document 2",
    blocks: [
      {
        id: "block4",
        type: "text",
        content: { text: "Another sample block." },
      },
    ],
  },
};

// Mock socket
const mockSocket = {
  emit: (event: string, ...args: any[]) => {
    console.log(`Emitted ${event}`, args);
    if (typeof args[args.length - 1] === "function") {
      const callback = args[args.length - 1];
      setTimeout(() => {
        switch (event) {
          case "fetchDocument":
            const docId = args[0];
            callback(mockDocuments[docId] || new Error("Document not found"));
            break;
          default:
            callback(new Error("Unknown event"));
        }
      }, 100); // Simulate network delay
    }
  },
};

export const initializeSocket = () => {
  console.log("Mock socket initialized");
  return mockSocket;
};

export const fetchDocument = (documentId: string): Promise<Document> => {
  return new Promise((resolve, reject) => {
    mockSocket.emit(
      "fetchDocument",
      documentId,
      (response: Document | Error) => {
        if ("message" in response) {
          reject(response);
        } else {
          resolve(response);
        }
      },
    );
  });
};

export const updateDocument = (
  documentId: string,
  data: Partial<Document>,
): void => {
  mockSocket.emit("updateDocument", { documentId, data });
  // Update mock data
  if (mockDocuments[documentId]) {
    mockDocuments[documentId] = { ...mockDocuments[documentId], ...data };
  }
};

export const createBlock = (documentId: string, data: Partial<Block>): void => {
  mockSocket.emit("createBlock", { documentId, data });
  // Update mock data
  if (mockDocuments[documentId]) {
    const newBlock = { id: `block${Date.now()}`, ...data } as Block;
    mockDocuments[documentId].blocks.push(newBlock);
  }
};

export const updateBlock = (
  documentId: string,
  blockId: string,
  data: Partial<Block>,
): void => {
  mockSocket.emit("updateBlock", { documentId, blockId, data });
  // Update mock data
  if (mockDocuments[documentId]) {
    const blockIndex = mockDocuments[documentId].blocks.findIndex(
      (b) => b.id === blockId,
    );
    if (blockIndex !== -1) {
      mockDocuments[documentId].blocks[blockIndex] = {
        ...mockDocuments[documentId].blocks[blockIndex],
        ...data,
      };
    }
  }
};

export const deleteBlock = (documentId: string, blockId: string): void => {
  mockSocket.emit("deleteBlock", { documentId, blockId });
  // Update mock data
  if (mockDocuments[documentId]) {
    mockDocuments[documentId].blocks = mockDocuments[documentId].blocks.filter(
      (b) => b.id !== blockId,
    );
  }
};
