import React, { useState } from 'react';
import { Table} from 'react-bootstrap';
import data from '../data';
import PrevNextButtons from './PrevNextButtons';

const formattedRows = (columns, format) => {
  return data.routes.map((route, index) => (
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
  ));
}

const RoutesTable = ({className, columns, rows, format, PER_PAGE}) => {
  const h2Style = {
    margin: "0 auto",
    width: "90%"
  }

  const ALL_ROWS = formattedRows(columns, format);

  const [currentPage, setCurrentPage] = useState(1);
  const START_INDEX = (currentPage - 1) * PER_PAGE;
  const END_INDEX = START_INDEX + PER_PAGE;
  const CURRENT_ROWS = ([...ALL_ROWS].slice(START_INDEX, END_INDEX));

  return (
    <div>
      <h2 style={h2Style}>Routes</h2>
      <p style={h2Style}>Showing {START_INDEX + 1} - {END_INDEX} routes of {ALL_ROWS.length} total routes</p>
      <PrevNextButtons 
        disableNext = {currentPage >= ALL_ROWS.length/PER_PAGE}
        disablePrev = { currentPage <= 1} 
        setCurrentPage={setCurrentPage}
        currentPage = {currentPage}
      />
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
          {CURRENT_ROWS}
        </tbody>
      </Table>
      <PrevNextButtons 
        disableNext = {currentPage >= ALL_ROWS.length/PER_PAGE}
        disablePrev = { currentPage <= 1} 
        setCurrentPage={setCurrentPage}
        currentPage = {currentPage}
      />
    </div>
  )
}

export default RoutesTable;