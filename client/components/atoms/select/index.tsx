import React from 'react';
import Select, { ActionMeta } from 'react-select';
import makeAnimated from 'react-select/animated';

import * as T from '../../../types'

const animatedComponents = makeAnimated();

interface Props {
  options: Array<T.SelectOption>
  handleChange: ((newValue: Array<T.Category> | unknown, actionMeta: ActionMeta<unknown>) => void) | undefined
}

function ReactSelect({ options, handleChange }: Props) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[options[0]]}
      isMulti
      options={options}
      onChange={handleChange}
    />
  )
}

export default ReactSelect
