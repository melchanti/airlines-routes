import React from 'react';
import { Table } from 'react-bootstrap';
import data from '../data';

const RoutesTable = ({className, columns, rows, format}) => {
  const h2Style = {
    margin: "0 auto",
    width: "90%"
  }
  
  return (
    <div>
      <h2 style={h2Style}>Routes</h2>
      <Table className={className}>
      <thead>
        <tr>
          <th>#</th>
          <th>Airline</th>
          <th>src</th>
          <th>dest</th>
        </tr>
      </thead>
      <tbody>
        {data.routes.map((route, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              {columns.map(column => {
                return (
                  <td key={column.property}>
                    {format(column.property, route[column.property])}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
  )
}

export default RoutesTable;