import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
  BaseElement,
  Node,
  BaseEditor,
} from "slate";
import { Slate, Editable, withReact, ReactEditor, useSlate } from "slate-react";
import { withHistory } from "slate-history";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface CustomElement extends SlateElement {
  type: string;
  children: CustomText[];
}

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

const BLOCK_TYPES = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading-one", label: "Heading 1" },
  { type: "heading-two", label: "Heading 2" },
  { type: "block-quote", label: "Quote" },
  { type: "bulleted-list", label: "Bullet List" },
  { type: "numbered-list", label: "Numbered List" },
  { type: "list-item", label: "List Item" },
];

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "Start typing here..." }],
  },
];

// ... (other utility functions remain the same)

const BlockMenu: React.FC<{
  editor: Editor;
  onClose: () => void;
  position: { top: number; left: number } | null;
}> = ({ editor, onClose, position }) => {
  if (!position) return null;

  function toggleBlock(editor: BaseEditor, type: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className="block-menu"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {BLOCK_TYPES.map((blockType) => (
        <button
          key={blockType.type}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, blockType.type);
            onClose();
          }}
        >
          {blockType.label}
        </button>
      ))}
    </div>
  );
};

const NoterAIEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<CustomElement[]>(initialValue);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const Element = ({
    attributes,
    children,
    element,
  }: {
    attributes: any;
    children: React.ReactNode;
    element: CustomElement;
  }) => {
    switch (element.type) {
      case "paragraph":
        return <p {...attributes}>{children}</p>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  };

  const renderElement = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & {
        attributes: any;
        children: React.ReactNode;
        element: CustomElement;
      }
    ) => <Element {...props} />,
    []
  );
  const Leaf = ({
    attributes,
    children,
    leaf,
  }: {
    attributes: any;
    children: React.ReactNode;
    leaf: CustomText;
  }) => {
    return (
      <span
        {...attributes}
        style={{
          fontWeight: leaf.bold ? "bold" : "normal",
          fontStyle: leaf.italic ? "italic" : "normal",
          textDecoration: leaf.underline ? "underline" : "none",
        }}
      >
        {children}
      </span>
    );
  };

  const renderLeaf = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & {
        attributes: any;
        children: React.ReactNode;
        leaf: CustomText;
      }
    ) => <Leaf {...props} />,
    []
  );

  const handleDragEnd = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) return;

    const newValue = Array.from(value);
    const [reorderedItem] = newValue.splice(result.source.index, 1);
    newValue.splice(result.destination.index, 0, reorderedItem);

    setValue(newValue);
  };

  const showMenu = useCallback((editor: Editor) => {
    const { selection } = editor;
    if (!selection || !Range.isCollapsed(selection)) return;

    const [start] = Range.edges(selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const before = wordBefore && Editor.before(editor, wordBefore);
    const beforeRange = before && Editor.range(editor, before, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);

    if (beforeText === "/") {
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        setMenuPosition({
          top: rect.top + window.pageYOffset + 24,
          left: rect.left + window.pageXOffset,
        });
      }
    } else {
      setMenuPosition(null);
    }
  }, []);

  useEffect(() => {
    if (menuPosition) {
      const closeMenu = (e: MouseEvent) => {
        if (
          editorRef.current &&
          !editorRef.current.contains(e.target as unknown as Node)
        ) {
          setMenuPosition(null);
        }
      };
      document.addEventListener("mousedown", closeMenu);
      return () => document.removeEventListener("mousedown", closeMenu);
    }
  }, [menuPosition]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(value) => {
          setValue(value as CustomElement[]);
          showMenu(editor);
        }}
      >
        <div ref={editorRef}>
          <Droppable droppableId="editor">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {value.map((element, index) => (
                  <Draggable
                    key={index}
                    draggableId={`block-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div className="block-wrapper">
                          <div
                            {...provided.dragHandleProps}
                            className="drag-handle"
                          >
                            ⋮
                          </div>
                          <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Type '/' for commands"
                            onKeyDown={(event) => {
                              if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                Transforms.insertNodes(editor, {
                                  type: "paragraph",
                                  children: [{ text: "" }],
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <BlockMenu
            editor={editor}
            onClose={() => setMenuPosition(null)}
            position={menuPosition}
          />
        </div>
      </Slate>
    </DragDropContext>
  );
};

export default NoterAIEditor;
