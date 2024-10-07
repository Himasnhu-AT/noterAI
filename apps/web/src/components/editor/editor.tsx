"use client";

import React, { useEffect, useState } from "react";
import { BlockNoteView } from "@blocknote/mantine"; // Import BlockNote view
import { useCreateBlockNote } from "@blocknote/react"; // Import BlockNote hook
import "@blocknote/core/fonts/inter.css"; // Import BlockNote fonts
import "@blocknote/mantine/style.css"; // Import your custom styles for the editor

interface EditorProps {
  // document: {
  //   id: string;
  //   title: string;
  //   blocks: any[]; // Assume blocks are of any type for now
  // };
  document: any;
  editable: boolean;
  onChange: (document: any) => void;
}

export default function Editor({ document, editable, onChange }: EditorProps) {
  const [localDocument, setLocalDocument] = useState(document);

  const editor = useCreateBlockNote();

  useEffect(() => {
    setLocalDocument(document);
  }, [document]);

  // const handleEditorChange = (document: any[]) => {
  //   // Assuming editor has a method to get the current content as JSON or similar
  //   setLocalDocument(document);
  //   console.log(JSON.stringify(document));
  // };

  return (
    <div className="editor">
      {/* <BlockNoteView
        editor={editor} // Attach the BlockNote editor
        onChange={handleEditorChange}
        data-theming-css-variables-demo
        theme="light"
      /> */}
      <BlockNoteView
        editable={true}
        editor={editor}
        // theme={resolvedTheme === "dark" ? "dark" : "light"}
        theme={"light"}
        className="flex-grow bn-container overflow-auto p-0 pt-4 pb-4"
        onChange={() => {
          // setBlocks(editor.document);
          // onChange(JSON.stringify(blocks));
          onChange(editor.document);
        }}
      />
      <div className="blocks space-y-4"></div>
    </div>
  );
}
