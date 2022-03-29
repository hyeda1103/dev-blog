import React, { ChangeEvent } from 'react';
import ErrorBox from '@/components/molecules/errorBox';
import * as T from '@/types/index'
import {
  StyledLabel,
  Text,
  StyledInput,
} from './styles';

interface Props {
  id: string
  label: string
  type: string
  accept?: string
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void
  formErrors: T.Object
}

function FileWithLabel({
  id, label, type, accept, handleChange, formErrors
}: Props) {
  return (
    <StyledLabel htmlFor={id}>
      <Text>
        {label}
      </Text>
      <StyledInput
        id={id}
        type={type}
        autoComplete="off"
        onChange={handleChange(id)}
        accept={accept}
        error={!!formErrors[id]}
        hidden
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </StyledLabel>
  );
}

export default FileWithLabel;
