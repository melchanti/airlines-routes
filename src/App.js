import React, { Component } from 'react';
import './App.css';
import data, {getAirlineById, getAirportByCode} from './data';
import { Table } from 'react-bootstrap';

const Routes = () => {
  return (
    <div>
      <h2>Routes</h2>
      <Table>
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
          const AIRLINE_NAME = getAirlineById(route.airline).name;
          const SRC_NAME = getAirportByCode(route.src).name;
          const DEST_NAME = getAirportByCode(route.dest).name;

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{AIRLINE_NAME}</td>
              <td>{SRC_NAME}</td>
              <td>{DEST_NAME}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
  )
}

const App = () => {
  return (
    <div className="app container">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
      </section>
      <Routes></Routes>
    </div>
  )
}

export default App;