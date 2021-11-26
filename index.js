const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const getWeatherApi = require("./modules/weatherApi"); 
const openWeather = require("./modules/openWeather");
const aeris = require('./modules/aeris');
const weatherBit = require('./modules/weatherBit');
const visualCrossing = require('./modules/visualCrossing');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// getWeatherApi()

// openWeather()

// visualCrossing().then((res) => console.log(res))

// weatherBit()

aeris()
