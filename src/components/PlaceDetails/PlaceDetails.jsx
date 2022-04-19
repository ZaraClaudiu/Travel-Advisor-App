import React from "react";
import { Box, Typography, Button, Card, CardContent, CardMedia, CardActions, Chip } from "@material-ui/core";
import LocationIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating  from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ( {place} ) => {
  const classes = useStyles();


  return (
    <Card elevation={6}>
      <CardMedia 
        style={{height: 350 }}
        image={ place.photo ? place.photo.images.large.url : 'https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg' }
        title={ place.name }
        /> 
        <CardContent>
          <Typography gutterBottom variant="h5">{place.name}</Typography>
          <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly/>
          <Typography gutterBottom variant="subtitle 1">out of {place.num_reviews} reviews</Typography>
         </Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant="subtitle 1">Price</Typography>
            <Typography gutterBottom variant="subtitle 1">{place.price_level}</Typography>
          </Box>
          <Box display='flex' justifyContent='space-between'>
           <Typography variant="subtitle 1">Ranking</Typography>
           <Typography gutterBottom variant="subtitle 1">{place.ranking}</Typography>
          </Box>
          {place?.awards?.map((award) => (
          <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle 2" color="textSecondary">{award.display_name}</Typography>
          </Box>
          ))}

          {place?.cuisine?.map(({ name }) => (
              <Chip key={ name } size='small' label={name} className={classes.chip} />
          ))}

          {place?.address && (
            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
              <LocationIcon  /> {place.address}
            </Typography>
          )}

          {place?.phone && (
            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
              <PhoneIcon  /> {place.phone}
            </Typography>
          )}

          <CardActions>
            <Button size="small" color="primary" onClick={ () => window.open(place.web_url, '_blank')} >
              Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={ () => window.open(place.website, '_blank')} >
              Website
            </Button>
          </CardActions>

        </CardContent> 
    </Card>
  )
};

export default PlaceDetails;
