import React from 'react';
import dynamic from 'next/dynamic'

import ErrorBox from '@/components/molecules/errorBox';
import * as T from '@/types/index'
import { StyledLabel, Text } from './styles';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})
interface Props {
  id: string
  label: string
  value: string
  theme: string
  handleChange: any
  placeholder?: string
  formErrors: T.Object
}

function TextEditor({
  id, label, value, theme, handleChange, formErrors
}: Props) {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  /*
  * Quill editor formats
  * See https://quilljs.com/docs/formats/
  */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'code-block',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]
  
  return (
    <StyledLabel>
      <Text>
        {label}
      </Text>
      <ReactQuill
        value={value}
        onChange={handleChange}
        placeholder="Write Something..."
        theme={theme}
        modules={modules}
        formats={formats}
        style={{
          border: !!formErrors[id] ? '1px solid red' : '1px solid #666'
        }}
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </StyledLabel>
  );
}

export default TextEditor;
