import React from "react";
import { Col, Container, Row } from "reactstrap";
import WeeklyForecastWidget from "./WeeklyForecastWidget";
import { map } from "ramda";

import "../../styles/WeeklyForecastStyles.css";

//This renders the container that displays the forecast for the next 8 days
function WeeklyForecastContainer(props) {
  return (
    <Container>
      <h4>8 day Forecast</h4>

      <Row className="card-row">
        {map((weekDayData) => {
          return (
            <Col key={weekDayData.dt} xs="6" sm="4" md="3">
              <WeeklyForecastWidget
                weekDayForecastData={weekDayData}
                temperatureUnit={props.temperatureUnit.current}
              />
            </Col>
          );
        }, props.weeklyForecastData)}
      </Row>
    </Container>
  );
}

export default WeeklyForecastContainer;
