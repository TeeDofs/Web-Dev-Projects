import React, { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

import "../../styles/HourlyForecastStyles.css";
import WeatherIcon from "../WeatherIcon";
import HourlyForecastPopover from "./HourlyForecastPopover";

//This is a function to get the exact hour and minute from the date and display it in a HH:mm AM/PM format
function HourlyForecastWidget(props) {
  const [forecastDisplayData, setForecastDisplayData] = useState({});

  useEffect(() => {
    setForecastDisplayData({
      time: props.hourForecastData.dt,
      temperature:
        props.hourForecastData.temp + ` ${props.temperatureUnit.unit}`,
      icon: props.hourForecastData.weather[0].icon,
      precipitationChance:
        props.hourForecastData.pop !== null
          ? `${props.hourForecastData.pop} %  chance of rainfall`
          : "",
    });
  }, [props.hourForecastData]);

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

  //This renders the individual widgets that display the data based on the hour of the day
  return (
      <Card className="hourForecastWidgetCard">
        <CardBody>
          <CardTitle tag="h6">
            {getExactTimeFromDate(forecastDisplayData.time)}
          </CardTitle>
          <CardText tag="h6">{forecastDisplayData.temperature}</CardText>
          <WeatherIcon weatherIconCode={forecastDisplayData.icon} />
          <CardText>{forecastDisplayData.precipitationChance}</CardText>
        </CardBody>
      </Card>
  );
}

export default HourlyForecastWidget;
