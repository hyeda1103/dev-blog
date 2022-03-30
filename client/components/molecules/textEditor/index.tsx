import React from 'react';
import dynamic from 'next/dynamic'
import ErrorBox from '@/components/molecules/errorBox';
import * as T from '@/types/index'
import 'react-quill/dist/quill.bubble.css'
import { StyledLabel, Text } from './styles';
import 'react-quill/dist/quill.bubble.css'

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
