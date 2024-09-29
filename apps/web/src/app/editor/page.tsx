import { useEffect, useState } from 'react';
import Head from 'next/head';
import Editor from '../components/Editor';
import { Document } from '../types';
import { fetchDocument } from '../utils/api';

export default function Home() {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const doc = await fetchDocument('example-document-id');
        setDocument(doc);
      } catch (error) {
        console.error('Error loading document:', error);
      }
    };

    loadDocument();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>NotionAI Alternative</title>
        <meta name="description" content="An open-source NotionAI alternative" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-4xl font-bold mb-8">NotionAI Alternative</h1>
        {document ? (
          <Editor initialDocument={document} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </main>
    </div>
  );
}
