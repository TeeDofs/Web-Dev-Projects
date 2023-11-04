import React from "react";
import "../../styles/CurrentWeatherStyles.css";
import { CardText } from "reactstrap";

//This is a simple render to display the weather properties and their values
function WeatherConditionDetails(props) {
  return (
    <CardText className="weatherConditionDetails">
      <strong>{props.weatherCondition}</strong> : {props.weatherValue} <br />
    </CardText>
  );
}

export default WeatherConditionDetails;
