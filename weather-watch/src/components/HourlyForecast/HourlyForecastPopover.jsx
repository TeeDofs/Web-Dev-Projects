import React from "react";
import { useEffect } from "react";
import { Card, CardHeader, Container, Popover, PopoverBody, PopoverHeader } from "reactstrap";

function HourlyForecastPopover(props) {
    useEffect(() => {
        console.log("Hour Forecast Data: ", props.hourForecastData)
    }, [props.hourForecastData])

    const getExactTimeFromDate = (dateEntry) => {
        const date = new Date(dateEntry * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
    
        const timeString = `${formattedHours}:${formattedMinutes} ${period}`;
        return timeString;
      };
    
  return (
    <Popover 
        placement="bottom"
        target={props.targetId}
        isOpen={props.isPopOpen}
        trigger="hover"
    >
        <PopoverHeader>{getExactTimeFromDate(props.hourForecastData.dt)}</PopoverHeader>
        <PopoverBody>
            This is popping
        </PopoverBody>
    </Popover>
  );
}

export default HourlyForecastPopover;
