import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Paper, Container, Divider } from "@mui/material";

const App = () => {
  const [location, setlocation] = useState();
  const [weatherData, setweatherData] = useState();

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        if (coords) {
          //Store that coords to a location state
          setlocation(coords);

          //Get data from the api using those user coords
          const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${
            coords.latitude
          }&lon=${coords.longitude}&exclude=minutely,hourly,daily&appid=${
            import.meta.env.VITE_APIKEY
          }`;

          try {
            const { data } = await axios.get(apiUrl);
            setweatherData(data);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }, []);
  console.log(weatherData);
  if (location && weatherData) {
    return (
      <div>
      
          <Typography p={2} align="center" variant="h4" color="initial">
            Weather App
            <img width = {50}
              src={`https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
              alt=""
            />
            </Typography>
        
        <Container maxWidth="md">
          <Stack spacing={1}  pb={3}>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="secondary">
                Today's Date & Time:{" "}
                {new Date(weatherData.current.dt * 1000).toString()}
              </Typography>
            </Paper>

            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Temperature: {(weatherData.current.temp - 273.15).toFixed(2)} °C
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Weather: {weatherData.current.weather[0].main},
                {weatherData.current.weather[0].description}
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Humidity: {weatherData.current.humidity} gm/kg
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Latitude: {weatherData.lat}
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Longitude: {weatherData.lon}
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Sunrise:{" "}
                {new Date(weatherData.current.sunrise * 1000).toString()}
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ backgroundColor: "#EFEFEF" }}>
              <Typography p={1} variant="body1" color="primary">
                Sunset: {new Date(weatherData.current.sunset * 1000).toString()}
              </Typography>
            </Paper>
          </Stack>
        </Container>
        <Divider >
        </Divider>
        <Typography pt={2} align="center" variant="body2" color="initial">Made by Swikrit</Typography>
      </div>
    );
  } else {
    return <div className="error">Enable location to continue</div>;
  }
};

export default App;
