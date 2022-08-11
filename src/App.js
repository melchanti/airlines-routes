import React, { Component } from 'react';
import './App.css';
import {getAirlineById, getAirportByCode} from './data';
import RoutesTable from './components/Table';


function formatValue(property, value) {
  switch (property) {
    case 'airline':
      return getAirlineById(value).name;
    case 'src':
      return getAirportByCode(value).name;
    case 'dest':
      return getAirportByCode(value).name;
    default:
      return 'unknown property';
  }
};

const App = () => {

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'}
  ];

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
      <RoutesTable className="routes-table" columns={columns} rows="" format={formatValue} />
    </div>
  )
}

export default App;