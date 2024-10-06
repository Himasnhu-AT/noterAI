import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/editor"), { ssr: false });

const HomePage = () => {
  return (
    <div>
      <h1>My Custom Rich Text Editor</h1>
      <Editor />
    </div>
  );
};

export default HomePage;
