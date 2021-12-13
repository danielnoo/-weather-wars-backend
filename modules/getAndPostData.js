const Entry = require("../models/entry");
const getWeatherApiCall = require("./weatherApi");
const openWeatherCall = require("./openWeather");
const bestWeatherCall = require("./bestWeather");
const weatherBitCall = require("./weatherBit");
const visualCrossingCall = require("./visualCrossing");
const visionWeatherCall = require("./visionWeather");
const getPreviousEntryForecast = require("./getPreviousEntryForecast");

// refactor entry model so that it must contain data from each of the api calls
// craft it in this module and send it to database

const getAndPostData = async () => {
  // get previous forecasts for comparison -- { api: forecast }
  const previousForecasts = await getPreviousEntryForecast();

  // make api calls

  const bestWeather = await bestWeatherCall(previousForecasts.bestWeather);
  const openWeather = await openWeatherCall(previousForecasts.openWeather);
  const visualCrossing = await visualCrossingCall(
    previousForecasts.visualCrossing
  );
  const weatherApi = await getWeatherApiCall(previousForecasts.weatherApi);
  const weatherBit = await weatherBitCall(previousForecasts.weatherBit);
  const visionWeather = await visionWeatherCall(previousForecasts.visionWeather)

  // make the entry via model

  const entry = new Entry({
    bestWeather,
    openWeather,
    visualCrossing,
    weatherApi,
    weatherBit,
    visionWeather,
    date: new Date(),
  });

  // send to db

  entry.save().catch((error) => console.log(error));
};

module.exports = getAndPostData;
