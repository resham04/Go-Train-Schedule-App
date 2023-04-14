const express = require("express");
const app = express();
const cache = require("memory-cache");
const utils = require("./utils");

const bodyParser = require("body-parser");
const trainTimeTable = require("./timeTable.json");

//middleware for bodyparser to parsing JSON, URL-encoded over an HTTP request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware to handle CORS required if we need to access this API from diffrent servers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET ,POST,PATCH, DELETE");
  next();
});

// GET schedule route to fetch the Full time Table
app.get("/schedule", async (req, res, next) => {
  try {
    let schedule = cache.get("schedule");
    if (!schedule) {
      console.log(`Returning cached result for`);
      schedule = trainTimeTable;
      cache.put("schedule", schedule, 60 * 100); // Cache for 60 sec
    }
    res.status(200).json({
      message: "Full Schedule fetched successfully",
      schedule: schedule,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error : " + error);
  }
});

// Get Schedule by line along with 404 handling 
app.get("/schedule/:line", async (req, res) => {
  const trainLine = req.params.line;
  const trainSchedule = await getTrainScheduleByLine(trainLine);
  if (trainSchedule.length === 0) {
    res.status(404).send("No Train schedule found for this line");
  }
  res.status(200).json({
    message:
      "Found " + trainSchedule.length + " train schedule for line " + trainLine,
    schedule: trainSchedule,
  });
});

// Get Schedule by departure time along with 404 and 500 error hanlding
app.get("/schedule/:line/:departure", async (req, res) => {
  let departureTime24h;
  const trainLine = req.params.line;
  const departureTime = req.params.departure;

  // Validate the departure time format 24hr and 12hr
  const is24HourFormat = /^\d{3,4}$/.test(departureTime);
  const is12HourFormat = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(
    departureTime
  );

  if (!is24HourFormat && !is12HourFormat) {
    return res.status(400).send("Invalid departure time format");
  }

  if (is12HourFormat) {
    departureTime24h = utils.convertTo24Hour(departureTime);
  } else {
    departureTime24h = departureTime;
  }
  try {
    const trainSchedule = await getTrainScheduleByDeparture(
      trainLine,
      departureTime24h
    );

    if (trainSchedule.length === 0) {
      return res.status(404).send("Train schedule not found");
    }

    return res.status(200).json({
      message:
        "Found " +
        trainSchedule.length +
        " train schedule for line " +
        trainLine,
      schedule: trainSchedule,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error : " + error);
  }
});

function getTrainScheduleByDeparture(trainLine, departureTime) {
  return new Promise((resolve, reject) => {
    const cacheKey = `${trainLine}-${departureTime}`;
    const cachedSchedule = cache.get(cacheKey);
    if (cachedSchedule) {
      console.log(`Using cached result for ${cacheKey}`);
      resolve(cachedSchedule);
    } else {
      const trainSchedule = trainTimeTable.filter((schedule) => {
        return (
          schedule.line === trainLine && schedule.departure === departureTime
        );
      });
      if (trainSchedule.length === 0) {
        reject(`Train schedule not found`);
      } else {
        console.log(`Caching result for ${cacheKey}`);
        cache.put(cacheKey, trainSchedule, 60 * 100); //Cache for 60 sec
        resolve(trainSchedule);
      }
    }
  });
}

function getTrainScheduleByLine(line) {
  return new Promise((resolve, reject) => {
    const cachedSchedule = cache.get(`${line}`);
    if (cachedSchedule) {
      console.log(`Using cached result for ${line}`);
      resolve(cachedSchedule);
    } else {
      console.log(`Caching result for ${line}`);
      const trainSchedule = trainTimeTable.filter((schedule) => {
        return schedule.line === line;
      });
      if (trainSchedule.length > 0) {
        cache.put(`${line}`, trainSchedule, 60 * 100); //Cache for 60 sec
        resolve(trainSchedule);
      } else {
        reject(`No train schedule found for line ${line}`);
      }
    }
  });
}

app.use((req, res, next) => {
  res.send(
    " <b>Welcome to Go Train Schedule API along with Example Endpoints</b> <br> " +
      "<br> 1. Full Schedule API -->   http://localhost:3000/schedule <br>" +
      "<br>  2. Get Schedule by Train Line -->  http://localhost:3000/schedule/Lakeshore <br>" +
      "<br>  3. Get Schedule by Train Line and departure (12hr)-->  http://localhost:3000/schedule/Lakeshore/12:00pm <br>" +
      "<br>  4. Get Schedule by Train Line and departure (24hr)-->  http://localhost:3000/schedule/Lakeshore/800<br>"
  );
});

module.exports = app;
