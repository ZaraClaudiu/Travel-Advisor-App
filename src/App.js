import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Unstable_TrapFocus } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // find your location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  // change only when the rating changes
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);
// change only when the type changes
  useEffect(() => {
    if(bounds.sw && bounds.ne) {

    getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => {
          setWeatherData(data)
        });

    getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            // data.filter choose only relevant restaurants
      setPlaces(data.filter( (place) => place.name && place.num_reviews >= 1));
      setFilteredPlaces([]);
    });
  }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
