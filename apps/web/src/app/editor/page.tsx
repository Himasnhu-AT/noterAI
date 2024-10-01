"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { fetchDocument, initializeSocket } from "@/utils/editor_socket";
import { Document } from "@/types/editor";
import Editor from "@/components/editor/editor";

export default function Home() {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    // const socket = initializeSocket();
    const documentId = "example-document-id";

    const loadDocument = async () => {
      try {
        const doc = await fetchDocument(documentId);
        setDocument(doc);
      } catch (error) {
        console.error("Error loading document:", error);
      }
    };

    loadDocument();

    // socket.on(`documentUpdate:${documentId}`, (updatedDoc: Document) => {
    //   setDocument(updatedDoc);
    // });

    // return () => {
    //   socket.off(`documentUpdate:${documentId}`);
    // };
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>NotionAI Alternative</title>
        <meta
          name="description"
          content="An open-source NotionAI alternative"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-4xl font-bold mb-8">NotionAI Alternative</h1>
        {document ? (
          <Editor document={document} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </main>
    </div>
  );
}
