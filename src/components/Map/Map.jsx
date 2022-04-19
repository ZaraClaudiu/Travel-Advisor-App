import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({setCoordinates, setBounds, coordinates, places, weatherData }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-witdh:600px)");


  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        >
        {places?.map( (place, i) => (
            <div 
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
            >
            {
              isDesktop ? (
                <LocationOnOutlinedIcon color='primary' fontSize="large"/>
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant='subtitle 2' gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                      className={classes.pointer}
                      src={ place.photo ? place.photo.images.large.url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Frestauranttimisoara1.wordpress.com%2F&psig=AOvVaw3rvfAOvX9Um0fYV7Xnqa_I&ust=1650040867068000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNCf9bz_k_cCFQAAAAAdAAAAABAE'}
                      alt={place.name}
                  />
                  <Rating size='small' value={Number(place.rating)} readOnly/>
                </Paper>
              )
            }
            
            </div>
        ))}
        {weatherData?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lon={data.coord.lon}>
            <img height={100} src={`https//openweathermap.org/img/w/${data.weather[0].icon.png}`} alt='weather' />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
