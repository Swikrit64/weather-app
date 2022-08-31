import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import "./styles/app.css";
import axios from "axios";
const App = () => {
  const [location, setlocation] = useState({
    latitude: "",
    longitude: "",
  });

  //Get location using react-geolocated library
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
        timeout: Infinity,
      },
      userDecisionTimeout: null,
    });

  const [weatherData, setweatherData] = useState();

  useEffect(() => {
    const getWeatherData = async () => {
      //template literal le string bhitra variable halna milxa
      const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${
        coords.latitude
      }&lon=${coords.longitude}&exclude=minutely,hourly,daily&appid=${
        import.meta.env.VITE_APIKEY
      }`;

      // try {
      //   const weatherData = await axios.get(apiUrl);
      //   console.log(weatherData);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    getWeatherData();
    console.log(import.meta.env.VITE_APIKEY);
  }, []);

  if (!isGeolocationAvailable) {
    return (
      <div className="error">Your browser does not support Geolocation</div>
    );
  } else if (isGeolocationEnabled) {
    return (
      <div>
        <h1 className="header">Weather App</h1>
        {coords ? (
          <p>
            Latitude: {coords.latitude} Longitude: {coords.longitude}
          </p>
        ) : (
          <p>Getting your location, please wait...</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="error">
        Geolocation is not enabled, Please enable it to continue
      </div>
    );
  }
};

export default App;
