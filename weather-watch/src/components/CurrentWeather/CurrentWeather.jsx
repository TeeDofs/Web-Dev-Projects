import React, { useEffect, useState } from "react";
import WeatherConditionDetails from "./WeatherConditionDetails";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import "../../styles/CurrentWeatherStyles.css";
import WeatherIcon from "../WeatherIcon";

function CurrentWeather(props) {
  //we set the weather details using the data retrieved from the weather data api
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState({});

  useEffect(() => {
    //This creates our own custom weather data object so we can store weather details in a way that is more convenient for us to work with
    setCurrentWeatherDetails({
      City: props.locationCity,
      Temperature: `${props.weatherData.temp} ${props.temperatureUnit.current.unit}`,
      Humidity: `${props.weatherData.humidity}%`,
      windSpeed: `${props.weatherData.wind_speed} m/s`,
      windDirection: `${getWindDirection(props.weatherData.wind_deg)}`,
      airPressure: `${props.weatherData.pressure} hPa`,
      Visibility: `${metersToKilometers(props.weatherData.visibility)} km`,
      Condition: props.weatherData.weather[0].description,
      feelsLike: `${props.weatherData.feels_like} ${props.temperatureUnit.current.unit}`,
      highTemp: `${props.dailyWeatherData.temp.max} ${props.temperatureUnit.current.unit}`,
      lowTemp: `${props.dailyWeatherData.temp.min} ${props.temperatureUnit.current.unit}`,
      uvIndex: `${props.weatherData.uvi}`,
    });
  }, [props.weatherData, props.dailyWeatherData]);

  //This is a function to convert meters to kilometers
  const metersToKilometers = (meters) => {
    return meters / 1000;
  };

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round((degrees % 360) / 22.5);
    return directions[index];
  };

  //This renders the weather widget details at the top of the page
  return (
    <Container className="currentWeatherWidget">
      <Card>
        <CardHeader className="centeredText display-1">
          {currentWeatherDetails.City}
        </CardHeader>
        <CardBody>
          <CardTitle className="centeredText display-5">
            {currentWeatherDetails.Temperature}
          </CardTitle>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col md>
                  <WeatherIcon
                    weatherIconCode={props.weatherData.weather[0].icon}
                  />
                </Col>
                <Col md>
                  <WeatherConditionDetails
                    weatherCondition={"Condition"}
                    weatherValue={currentWeatherDetails.Condition}
                  />
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <WeatherConditionDetails
                weatherCondition={"Feels Like"}
                weatherValue={currentWeatherDetails.feelsLike}
              />
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col md>
                  <WeatherConditionDetails
                    weatherCondition={"High"}
                    weatherValue={currentWeatherDetails.highTemp}
                  />
                </Col>
                <Col md>
                  <WeatherConditionDetails
                    weatherCondition={"Low"}
                    weatherValue={currentWeatherDetails.lowTemp}
                  />
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col md>
                  <WeatherConditionDetails
                    weatherCondition={"Wind Speed"}
                    weatherValue={currentWeatherDetails.windSpeed}
                  />
                </Col>
                <Col md>
                  <WeatherConditionDetails
                    weatherCondition={"Wind Direction"}
                    weatherValue={currentWeatherDetails.windDirection}
                  />
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <WeatherConditionDetails
                weatherCondition={"Humidity"}
                weatherValue={currentWeatherDetails.Humidity}
              />
            </ListGroupItem>

            <ListGroupItem>
              <WeatherConditionDetails
                weatherCondition={"UV Index"}
                weatherValue={currentWeatherDetails.uvIndex}
              />
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </Container>
  );
}

export default CurrentWeather;
