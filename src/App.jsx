import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import "./styles/app.css";
const App = () => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState("");

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
        timeout: Infinity,
      },
      userDecisionTimeout: null,
    });

  if (!isGeolocationAvailable) {
    setError("Your browser does not support Geolocation");
  }
  if (!isGeolocationEnabled) {
    setError("Geolocation is not enabled");
  } else {
    coords &&
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
  }

  return (
    <div>
      <h1 className="header">Weather App</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "green" }}>
          Your location is latitude: {location.latitude}, longitude:{" "}
          {location.longitude}
        </p>
      )}
    </div>
  );
};

export default App;

// if (location.latitude == "") 

// if (!isGeolocationAvailable) {
//   setError("Your browser does not support Geolocation");
// } else if (!isGeolocationEnabled) {
//   setError("Geolocation is not enabled");
// } else {
//   setLocation({ latitude: coords.latitude, longitude: coords.longitude });
// }
