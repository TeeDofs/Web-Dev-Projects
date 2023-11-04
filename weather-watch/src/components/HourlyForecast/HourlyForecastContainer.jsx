import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import HourlyForecastWidget from "./HourlyForecastWidget";
import { append, concat, map, prop, sortBy, take } from "ramda";
import "../../styles/HourlyForecastStyles.css";
import { useState } from "react";
import HourlyForecastPopover from "./HourlyForecastPopover";

function HourlyForecastContainer(props) {
  const [updatedHourlyForecastData, setUpdatedHourlyForecastData] = useState(
    props.hourlyForecastData
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    updateHourlyData();
  }, [props.hourlyForecastData, props.currentWeatherData]);

  const updateHourlyData = () => {
    const hourData = take(24, props.hourlyForecastData);

    const sunRiseData = {
      dt: props.currentWeatherData.sunrise,
      temp: "Sunrise",
      weather: [
        {
          description: "Sun Rise",
          icon: "sunR",
        },
      ],
      pop: null,
    };

    const sunSetData = {
      dt: props.currentWeatherData.sunset,
      temp: "Sunset",
      weather: [
        {
          description: "Sun Set",
          icon: "sunS",
        },
      ],
      pop: null,
    };

    let updatedHourData = concat([sunRiseData, sunSetData], hourData);

    updatedHourData = sortBy(prop("dt"), updatedHourData);

    setUpdatedHourlyForecastData(updatedHourData);
  };

  //This renders the scrollable list of the hourly forecast for the next 24 hours
  return (
    <Container>
      <h4>24 Hour Forecast</h4>
      <Row className="scrollable-card-list">
        <Col>
          <div className="scrollable-container">
            {map((hourlyData) => {
              return (
                <div key={hourlyData.dt}>
                  <HourlyForecastWidget
                    id={hourlyData.dt + "DT"}
                    hourForecastData={hourlyData}
                    temperatureUnit={props.temperatureUnit.current}
                    // onMouseOver={() => setPopoverOpen(true)}
                    // onMouseOut={() => setPopoverOpen(false)}
                  />

                  {/* <HourlyForecastPopover
                    hourForecastData={hourlyData}
                    targetId={hourlyData.dt + "DT"}
                    isPopOpen={popoverOpen}
                  /> */}
                </div>
              );
            }, updatedHourlyForecastData)}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HourlyForecastContainer;
