const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const getAndPostData = require("./modules/getAndPostData");
const cron = require("node-cron");


const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// Run cron-job every day at 3pm - gathers weather API data and saves to DB

cron.schedule(
  "0 0 15 * * *",
  () => {
    logger.info(
      "running cron-job - getting weather and forecasts and saving to DB"
    );

    getAndPostData();
  },
  {
    scheduled: true,
    timezone: "America/Toronto",
  }
);


// leaving backend to collect data for a few days so I have something to print to front page

// test get latest

// console.log(getLatest().then(result => console.log(result)))

getAndPostData()