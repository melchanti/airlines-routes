import React, { useState } from 'react';
import './App.css';
import {getAirlineById, getAirportByCode} from './data';
import RoutesTable from './components/Table';
import data from './data';
import Select from './components/Select';
import { Button } from 'react-bootstrap';
import Map from './components/Map';

const ROUTES_PER_PAGE = 50;

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

const handleAirlineSelect = (event, setRoutes, setValue, setFilteredAirports, airportSelect) => {
  let airlineId;
  let airportCode;
  try {
    airportCode = data.airports.find(airport => airportSelect === airport.name).code;
  } catch {
    airportCode = undefined;
  }
  try {
    airlineId = data.airlines.find(airline => event.target.value === airline.name).id;
    let filteredRoutes = data.routes.filter(route => {
      return route.airline === airlineId;
    });
    setFilteredAirports(data.airports.filter(airport => {
      return filteredRoutes.some(route => route.src === airport.code || route.dest === airport.code);
    }));

    if (airportCode) {
      filteredRoutes = filteredRoutes.filter(route => {
        return (route.src === airportCode || route.dest === airportCode);
      })
    }
    
    setRoutes(filteredRoutes);  
  } catch {
    if (airportCode) {
      setRoutes(data.routes.filter(route => {
        return (route.src === airportCode || route.dest === airportCode);
      }))
    } else {
      setRoutes(data.routes);
    }
    setFilteredAirports(data.airports);
  }
  setValue(event.target.value);
}

const changeAirport = (value, setRoutes, setValue, setFilteredAirlines, airlineSelect) => {
  console.log(setFilteredAirlines);
  let airportCode;
  let airlineId;
  try {
    airlineId = data.airlines.find(airline => airlineSelect === airline.name).id;
  } catch {
    airlineId = undefined;
  }

  try {
    
    airportCode = data.airports.find(airport => value === airport.name).code;
    let filteredRoutes = data.routes.filter(route => {
      return (route.src === airportCode || route.dest === airportCode);
    });
    setFilteredAirlines(data.airlines.filter(airline => {
      return filteredRoutes.some(route => route.airline === airline.id);
    }));

    if (airlineId) {
      filteredRoutes = filteredRoutes.filter(route => {
        return route.airline === airlineId;
      });
    }
    
    setRoutes(filteredRoutes);
    
  } catch {
    if (airlineId) {
      setRoutes(data.routes.filter(route => route.airline === airlineId));
    } else {
      setRoutes(data.routes);
    }
    setFilteredAirlines(data.airlines);
  }
  setValue(value);
}

const handleAirportSelect = (event, setRoutes, setValue, setFilteredAirlines, airlineSelect) => {
  changeAirport(event.target.value, setRoutes, setValue, setFilteredAirlines, airlineSelect);
}

const handleFilterReset = (setAirlineSelect, setAirportSelect, setRoutes) => {
  setAirlineSelect('All Airlines');
  setAirportSelect('All Airports');
  setRoutes(data.routes);
}

const App = () => {
  const [routes, setRoutes] = useState(data.routes);
  const [airlineSelect, setAirlineSelect] = useState("All Airlines");
  const [airportSelect, setAirportSelect] = useState("All Airports");
  const [filteredAirlines, setFilteredAirlines] = useState(data.airlines);
  const [filteredAirports, setFilteredAirports] = useState(data.airports);

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'}
  ];

  filteredAirlines.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  filteredAirports.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <Map 
        changeAirport={changeAirport} 
        routes={ routes }
        setRoutes={ setRoutes }
        setAirportSelect={setAirportSelect}
        setFilteredAirlines={setFilteredAirlines}
        airlineSelect={airlineSelect}
        resetFilter={() => handleFilterReset(setAirlineSelect, setAirportSelect, setRoutes)}
      />
      <div className="divSelect">
        <Select 
          options={filteredAirlines}
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines"
          value={airlineSelect}
          onSelect={((event) => handleAirlineSelect(event, setRoutes, setAirlineSelect, setFilteredAirports, airportSelect))}
        />
        <Select
          options={filteredAirports}
          valueKey="code"
          titleKey="name"
          allTitle="All Airports"
          value={airportSelect}
          onSelect={((event) => handleAirportSelect(event, setRoutes, setAirportSelect, setFilteredAirlines, airlineSelect))}
        />
        <Button onClick={((event) => handleFilterReset(setAirlineSelect, setAirportSelect, setRoutes))}>
          Reset filters
        </Button>
      </div>
      
      <RoutesTable
        className="routes-table"
        columns={columns}
        rows={routes} 
        format={formatValue} 
        PER_PAGE={ROUTES_PER_PAGE}
      />
    </div>
  )
}

export default App;