import axios from "axios";

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

//Function to fetch weather data
export const fetchWeatherData = async (latitude, longitude, units) => {
  try {
    const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=${units}&appid=${weatherApiKey}`;
    const response = await axios.get(weatherApi);
    return response.data;
  } catch (error) {
    console.error("Error retrieving weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

//This function gets the city name of the current location based on the latitude and longitude provided to it
export const fetchLocationDetails = async (latitude, longitude) => {
  try {
    const reverseGeocodingEndpoint = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await axios.get(reverseGeocodingEndpoint);

    return {
      city: response.data.address.city,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error("Error retrieving reverse geocoding data:", error);
    throw new Error("Failed to fetch location details");
  }
};

//This is a function to get the latitude and longitude of the current location using a promise
export const fetchCurrentLocationCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};
