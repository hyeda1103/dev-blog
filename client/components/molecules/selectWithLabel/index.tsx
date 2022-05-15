import React from 'react';
import { ActionMeta } from 'react-select';

import ReactSelect from '@/components/atoms/select';
import ErrorBox from '@/components/molecules/errorBox';
import * as T from '@/types/index'
import {
  Container,
  Text,
} from './styles';

interface Props {
  id: string
  label: string
  handleChange: ((newValue: Array<T.Category> | unknown, actionMeta: ActionMeta<unknown>) => void) | undefined
  formErrors: T.Object
  options: Array<T.SelectOption>
}

function SelectWithLabel({
  id, label, handleChange, formErrors, options
}: Props) {
  return (
    <Container>
      <Text>
        {label}
      </Text>
      <ReactSelect
        options={options}
        handleChange={handleChange}
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </Container>
  );
}

export default SelectWithLabel;
