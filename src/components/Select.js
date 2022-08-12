import React from 'react';
import { Form } from 'react-bootstrap';
import data from '../data';

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect}) => {
  const selectStyle = {
    width: "25%",
    display: "inline-block"
  }
  let allOptions = valueKey === 'id' ? data.airlines : data.airports
  let optionKeys = options.map(option => option[valueKey]);
  return (
    <Form.Select style={selectStyle} onChange={onSelect} size="sm" value={value}>
      <option>{allTitle}</option>
      {allOptions.map(airline => {
        return (
          <option key={airline[valueKey]} disabled={!optionKeys.includes(airline[valueKey])}>
            {airline[titleKey]}
          </option>
        )
      })}
    </Form.Select>
  )
}

export default Select;