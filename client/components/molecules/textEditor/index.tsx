import dynamic from "next/dynamic";
import { useMemo, useRef } from 'react';
import axios from "axios";

import * as T from '@/types/index';
import ErrorBox from '@/components/molecules/errorBox';
import { API } from '../../../config';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

interface Props {
  id: string
  label: string
  value: string
  theme: string
  handleChange: any
  placeholder?: string
  formErrors: T.Object
}

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill');
  return function comp({ forwardedRef, ...props }: any) {
    return <RQ ref={forwardedRef} {...props} />;
  };
}, { ssr: false });

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function TextEditor({
  id, label, value, theme, handleChange, formErrors
}: Props) {
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    document.body.appendChild(input);
    
    input.click();
  
    input.onchange = async () => {
      console.log('삐약')
      if (input.files === null) return;
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const res = await axios.post(`${API}/post/upload-image`, { image: formData }, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (res.data) {
          const quill = quillRef.current?.getEditor();
          quill?.focus();

          const range = quill?.getSelection();
          const position = range ? range.index : 0;

          quill?.insertEmbed(position, 'image', {
            src: res.data,
            alt: res.data,
          });
          quill?.setSelection(position + 1, 1);
        }
      } catch (error) {
        
      }
    };
  }

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['code-block']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <>
      <ReactQuill
        forwardedRef={quillRef}
        placeholder="본문을 입력하세요..."
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
        theme={theme}
        style={{
          border: !!formErrors[id] ? '1px solid red' : '1px solid #666'
        }}
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </>
  );
}

export default TextEditor;