import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  BoldIcon,
  ItalicIcon,
  RotateCcw,
  RotateCw,
  Strikethrough,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import ToolbarButtonGroup from "./ToolbarButtonGroup";

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className="flex h-12 items-center  rounded bg-gray-200 px-2"
      ref={toolbarRef}
    >
      <ToolbarButtonGroup divider={true}>
        <ToolbarButton
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          ariaLabel="Undo"
        >
          <RotateCcw className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          ariaLabel="Redo"
        >
          <RotateCw className="size-4" />
        </ToolbarButton>
      </ToolbarButtonGroup>
      <ToolbarButtonGroup divider={true}>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          active={isBold}
          ariaLabel="Format Bold"
        >
          <BoldIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          active={isItalic}
          ariaLabel="Format Italics"
        >
          <ItalicIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          ariaLabel="Format Underline"
          active={isUnderline}
        >
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
          active={isStrikethrough}
          ariaLabel="Format Strikethrough"
        >
          <StrikethroughIcon className="size-4" />
        </ToolbarButton>
      </ToolbarButtonGroup>
      <ToolbarButtonGroup divider={false}>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          ariaLabel="Left Align"
        >
          <AlignLeftIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          ariaLabel="Center Align"
        >
          <AlignCenterIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          ariaLabel="Right Align"
        >
          <AlignRightIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
          className="toolbar-item"
          ariaLabel="Justify Align"
        >
          <AlignJustifyIcon className="size-4" />
        </ToolbarButton>
      </ToolbarButtonGroup>
    </div>
  );
}
