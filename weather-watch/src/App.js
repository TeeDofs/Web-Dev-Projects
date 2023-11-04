import React, { useEffect, useRef, useState } from "react";
import BackgroundComponent from "./components/Background";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DropdownMenuBar from "./components/DropdownMenuBar";
import {
  fetchWeatherData,
  fetchLocationDetails,
  fetchCurrentLocationCoordinates,
} from "./components/LocationComponents/WeatherApiDetails";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HourlyForecastContainer from "./components/HourlyForecast/HourlyForecastContainer";
import WeeklyForecastContainer from "./components/WeeklyForecast/WeeklyForecastContainer";

function App() {
  //The API key to access all the weather information about the current city location
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  //These states store the current Location city, the weather data for the location, if the page is still loading and any errors
  const [locationDetails, setLocationDetails] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const temperatureUnit = useRef({
    value: "imperial",
    unit: "°F",
  });

  //This is called at the start of the page load and will be recalled whenever the location city changes.
  useEffect(() => {
    getWeatherData();

    const intervalId = setInterval(getWeatherData, 10 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [weatherApiKey]);


  //This is a function to fetch the weather data by getting the current location coordinates, then getting the location city before getting the weather data
  const getWeatherData = async () => {
    try {
      const { latitude, longitude } = await fetchCurrentLocationCoordinates();
      const locationDetails = await fetchLocationDetails(latitude, longitude);
      setLocationDetails(locationDetails);

      const response = await fetchWeatherData(
        locationDetails.latitude,
        locationDetails.longitude,
        temperatureUnit.current.value
      );
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      setPageError(error);
      setLoading(false);
    }
  };

  //This is a function to set the weather data using the weather api
  const getWeatherApiData = async () => {
    try {
      const response = await fetchWeatherData(
        locationDetails.latitude,
        locationDetails.longitude,
        temperatureUnit.current.value
      );
      setWeatherData(response);
    } catch (error) {
      setPageError(error);
    }
  };

  //This function changes the temperature unit
  const handleTemperatureUnitSelect = (option) => {
    temperatureUnit.current = option;
    getWeatherApiData();
  };

  //This is where the page rendering starts based on different conditions

  //This will be rendered if the page is still loading the information needed
  if (loading) {
    return <div>Loading...</div>;
  }

  //This will be rendered if the page encounters some error while retrieving some information or for some other reason
  if (pageError) {
    return <div>Error: {pageError.message}</div>;
  }

  //This will be rendered if everything goes well and is the actual render for the app
  return (
    <React.Fragment>
      <div className="App">
        {/* This is the background of the page that all the app UI and functions will be displayed over */}
        <BackgroundComponent />

        <div className="topSection">
          {/* This is the dropdown menu at the top right corner where the user can edit and change the app to suit their preference */}
          <DropdownMenuBar
            onTemperatureUnitSelect={handleTemperatureUnitSelect}
          />

          {/* This is the top most widget that displays the current weather information of the current city */}
          <CurrentWeather
            locationCity={locationDetails.city}
            weatherData={weatherData.current}
            dailyWeatherData={weatherData.daily[0]}
            temperatureUnit={temperatureUnit}
          />
        </div>

        <div className="hourlyForecastSection">
          <HourlyForecastContainer
            hourlyForecastData={weatherData.hourly}
            temperatureUnit={temperatureUnit}
            currentWeatherData={weatherData.current}
          />
        </div>

        <div className="dailyForecastSection">
          <WeeklyForecastContainer
            weeklyForecastData={weatherData.daily}
            temperatureUnit={temperatureUnit}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
