import React from 'react';
import { Button } from "react-bootstrap";

const PrevNextButtons = ({disablePrev, disableNext, setCurrentPage, currentPage}) => {
  const prevStyle = {
    margin: "0 auto",
  }

  const nextStyle = {
    magin: "auto 0",
    float: "right"
  }

  const divStyle = {
    padding: "0% 5% 0% 5%"
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    
  }

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div style={divStyle}>
      <Button disabled={disablePrev} onClick={handlePrev} style={prevStyle}>Prev</Button>
      <Button disabled={disableNext} onClick={handleNext} style={nextStyle}>Next</Button>
    </div>
  )
}

export default PrevNextButtons;