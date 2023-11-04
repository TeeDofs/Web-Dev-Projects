import React from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiNightClear,
  WiFog,
  WiCloudy,
  WiThermometer,
  WiRainMix,
  WiStrongWind,
  WiSunrise,
  WiSunset
} from "react-icons/wi";

import "../styles/CurrentWeatherStyles.css";

function WeatherIcon(props) {
  //This function takes the weather code and size parameter and returns a weather icon component based on the code
  const getWeatherIcon = (weatherCode, size) => {
    switch (weatherCode) {
      case "01d":
        return <WiDaySunny size={size} />;
      case "01n":
        return <WiNightClear size={size} />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return <WiCloud size={size} />;
      case "04d":
      case "04n":
        return <WiCloudy size={size} />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <WiRain size={size} />;
      case "11d":
      case "11n":
        return <WiThunderstorm size={size} />;
      case "13d":
      case "13n":
        return <WiSnow size={size} />;
      case "50d":
      case "50n":
        return <WiFog size={size} />;
      case "temp":
        return <WiThermometer size={size} />;
      case "rain":
        return <WiRainMix size={size} />;
      case "wind":
        return <WiStrongWind size={size} />;
      case "sunR":
        return <WiSunrise size={size} />;
      case "sunS":
        return <WiSunset size={size} />;
      default:
        return null;
    }
  };

  //This renders the weather icon based on the weather icon code supplied
  return (
    <div className="weather-icon">
      {getWeatherIcon(props.weatherIconCode, 30)}
    </div>
  );
}

export default WeatherIcon;
