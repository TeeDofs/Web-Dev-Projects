import React from "react";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";

import "../../styles/WeeklyForecastStyles.css";
import WeatherIcon from "../WeatherIcon";

//This renders the individual widgets for the 8 day forecast
function WeeklyForecastWidget(props) {
  //This function takes in the date and returns the month and day
  const getDayMonth = (dateEntry) => {
    const date = new Date(dateEntry * 1000);

    const month = date.getMonth();
    const day = date.getDate();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${monthNames[month]} ${day}`;
  };

  return (
    <Card className="weekDayForecastWidgetCard">
      <CardBody>
        <CardTitle tag="h5">
          {getDayMonth(props.weekDayForecastData.dt)}
        </CardTitle>
        <Row>
          <Col sm="8" xs="8">
            <CardText>
              {props.weekDayForecastData.weather[0].description}
            </CardText>
          </Col>
          <Col>
            <WeatherIcon
              weatherIconCode={props.weekDayForecastData.weather[0].icon}
            />
          </Col>
        </Row>

        <Row>
          <Col sm="8" xs="8">
            <CardText>
              {props.weekDayForecastData.temp.day} {props.temperatureUnit.unit}
            </CardText>
          </Col>
          <Col>
            <WeatherIcon weatherIconCode={"temp"} />
          </Col>
        </Row>

        <Row>
          <Col sm="8" xs="8">
            <CardText>{props.weekDayForecastData.pop} %</CardText>
          </Col>
          <Col>
            <WeatherIcon weatherIconCode={"rain"} />
          </Col>
        </Row>

        <Row>
          <Col sm="8" xs="8">
            <CardText>{props.weekDayForecastData.wind_speed} m/s</CardText>
          </Col>
          <Col>
            <WeatherIcon weatherIconCode={"wind"} />
          </Col>
        </Row>

        <Row>
          <Col sm="6" xs="6">
            <CardText>
              <strong>Hi: </strong>
              {props.weekDayForecastData.temp.max} {props.temperatureUnit.unit}
            </CardText>
          </Col>
          <Col>
            <CardText>
              <strong>Lo: </strong>
              {props.weekDayForecastData.temp.min} {props.temperatureUnit.unit}
            </CardText>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default WeeklyForecastWidget;
