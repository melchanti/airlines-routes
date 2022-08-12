import React from 'react';
import { Form } from 'react-bootstrap';
import data from '../data';

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect, routes}) => {
  const selectStyle = {
    width: "25%",
    display: "inline-block"
  }
  let allOptions= valueKey === 'id'
    ? data.airlines
    : data.airports;

  let optionKeys = options.map(option => option[valueKey]);
  return (
    <Form.Select style={selectStyle} onChange={onSelect} size="sm" value={value} className="selectAirport">
      <option>{allTitle}</option>
      {allOptions.map(option => {
        return (
          <option key={option[valueKey]} disabled={!optionKeys.includes(option[valueKey])}>
            {option[titleKey]}
          </option>
        )
      })}
    </Form.Select>
  )
}

export default Select;

/*${valueKey === 'id'
? routes.filter(route => route.airline === option.id).length
: routes.filter(route => route.src === option.code || route.dest === option.code).length
}`
*/