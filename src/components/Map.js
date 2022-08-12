import React from "react";
import data from "../data";

const Map = ({routes}) => {

  const routesWithCoord = routes.map(route => {
    const srcAirport = data.airports.find(airport => airport.code === route.src);
    const destAirport = data.airports.find(airport => airport.code === route.dest)
    const x1 = srcAirport.long;
    const y1 = srcAirport.lat;
    const x2 = destAirport.long;
    const y2 = destAirport.lat;
    return {
      ...route, x1, y1, x2, y2
    };
  });

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        
        {routesWithCoord.map((route, index) => (
          <g key={index}>
            <circle className="source" cx={route.x1} cy={route.y1}>
              <title></title>
            </circle> 
            <circle className="destination" cx={route.x2} cy={route.y2}>
              <title></title>
            </circle>
            <path d={`M${route.x1} ${route.y1} L ${route.x2} ${route.y2}`} />
          </g>
        ))}
        {/* end route */}
      </g>
    </svg>
  )
}

export default Map;