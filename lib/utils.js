const { response } = require('express');

function locationSelection(data) {
  return { 
    formatted_query: data.display_name,
    latitude: data.lat,
    longitude: data.lon };

}

function WeatherSelection(weatherdata) {
  const SliceWeather = weatherdata.slice(0, 7);
  return SliceWeather.map(weather => {
    return {
      'forecast': weather.weather.description,
      'valid_date': weather.datetime
    };
  });
}

function ReviewSelection(businessess) {
  const data = businessess.map (item => {
    const obj = {};
    obj ['name'] = item.name;
    obj ['image_url'] = item.image_url;
    obj ['price'] = item.price;
    obj ['rating'] = item.rating;
    obj ['url'] = item.url;
    return obj;
  });
  return data;
}
    



module.exports = { locationSelection, WeatherSelection, ReviewSelection };