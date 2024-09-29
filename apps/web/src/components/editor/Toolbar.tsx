interface ToolbarProps {
  onAddBlock: (type: string) => void;
}

export default function Toolbar({ onAddBlock }: ToolbarProps) {
  return (
    <div className="toolbar mb-4 space-x-2">
      <button
        onClick={() => onAddBlock("text")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Add Text Block
      </button>
    </div>
  );
}
