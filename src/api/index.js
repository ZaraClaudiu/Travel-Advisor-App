import axios from "axios";

//const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
//for dynamics copy this link and use it as the first parameter and remove 'restaurants' with type
  

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': '44860dd52bmsh8f6e9b33df8abf0p155bfcjsnf8b37f527d13'
          }
        });

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng ) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{ 
      params: {
      lon: lng,
      lat: lat
    },
    headers: {
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      'X-RapidAPI-Key': ''

    }});
    return data;
  } catch (error) {
    console.log(error)
  }
}