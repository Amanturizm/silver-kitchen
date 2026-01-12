'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { ToolbarButton } from '@/widgets/ui/InputField/ui/TextEditor/ui/ToolbarButton';
import './styles.css';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
  UnderlineIcon,
  Undo2,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  label?: string;
  disabled?: boolean;
  error?: { message?: string };
}

export const TextEditor = ({ value = '', onChange, label, disabled, error }: Props) => {
  const [currentAlign, setCurrentAlign] = useState<'left' | 'center' | 'right'>('left');
  const [currentHeading, setCurrentHeading] = useState<1 | 2 | 3 | 4 | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Strike,
      Subscript,
      Superscript,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());

      const align = editor.getAttributes('paragraph').textAlign || 'left';
      setCurrentAlign(align as 'left' | 'center' | 'right');

      if (editor.isActive('heading', { level: 1 })) setCurrentHeading(1);
      else if (editor.isActive('heading', { level: 2 })) setCurrentHeading(2);
      else if (editor.isActive('heading', { level: 3 })) setCurrentHeading(3);
      else if (editor.isActive('heading', { level: 4 })) setCurrentHeading(4);
      else setCurrentHeading(null);
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <div>
        <div
          className={`flex flex-wrap items-center gap-1 rounded-t-md px-2 py-2 
            ${error ? 'border border-red-500 bg-red-50' : 'border border-gray-300 bg-gray-50'}
          `}
        >
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough size={16} />
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-gray-300" />

          <ToolbarButton
            active={currentHeading === 1}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={currentHeading === 2}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={currentHeading === 3}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={currentHeading === 4}
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          >
            <Heading4 size={16} />
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-gray-300" />

          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()}>
            <Code size={16} />
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-gray-300" />

          <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()}>
            <SubscriptIcon size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()}>
            <SuperscriptIcon size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              const url = prompt('Введите ссылку');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
          >
            <LinkIcon size={16} />
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-gray-300" />

          <ToolbarButton
            active={currentAlign === 'left'}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <TextAlignStart size={16} />
          </ToolbarButton>

          <ToolbarButton
            active={currentAlign === 'center'}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <TextAlignCenter size={16} />
          </ToolbarButton>

          <ToolbarButton
            active={currentAlign === 'right'}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <TextAlignEnd size={16} />
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-gray-300" />

          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 size={16} />
          </ToolbarButton>

          <div className="mx-1 h-5 w-px bg-gray-300" />

          <input
            type="color"
            className="h-8 w-8 cursor-pointer rounded border border-gray-300 p-0.5"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </div>

        <EditorContent
          editor={editor}
          className={`
            ProseMirror
            w-full
            bg-white
            px-3 py-2
            text-sm
            outline-none
            border border-t-0
            rounded-b-md
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
      </div>

      <span className="text-xs text-red-500 h-4">{error?.message}</span>
    </div>
  );
};
