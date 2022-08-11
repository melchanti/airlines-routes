import React, { Component } from 'react';
import './App.css';
import data from './data';
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
        {data.routes.map((route, index) => 
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{route.airline}</td>
              <td>{route.src}</td>
              <td>{route.dest}</td>
            </tr>
        )}
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