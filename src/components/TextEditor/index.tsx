"use client";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  ParagraphNode,
} from "lexical";
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/Toolbar";
import { Note } from "@prisma/client";

// const theme = {
//   // Theme styling goes here
//   ...
// }

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: unknown) {
  console.error(error);
}

export default function TextEditor({ note }: { note: Note }) {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    editorState: () => {
      const paragraphNode = $createParagraphNode();
      // Create a new TextNode
      const textNode = $createTextNode(note.content);

      // Append the text node to the paragraph
      paragraphNode.append(textNode);
      $getRoot().append(paragraphNode);
      $getRoot().selectEnd();
    },
  };

  console.log(note);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex flex-col flex-1 w-full  h-screen">
        <ToolbarPlugin />
        <div className="flex-1 h-full bg-gray-300">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="py-2 h-full px-4 text-base" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}
