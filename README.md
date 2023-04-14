# Go-Train-Schedule-App


## Installation
To install this API, you'll need to have Node.js and npm installed on your system.

1. Clone the repository
```bash
gh repo clone resham04/Go-Train-Schedule-App
```
2. Install dependencies:
```bash
npm install --save express
npm install memory-cache --save
```
3. Usage
```bash
node server.js OR nodemon server
```
This will start the server on port 3000 by default. You can change the port by setting the PORT environment variable.
To make requests to the API, send HTTP requests to the below endpoint, where it will display the Welcome page of the app
```bash
http://localhost:3000/
```

## Endpoints

#### 1.Get Full timeTable

```http
   GET /schedule
```
Example end point on local system
```
http://localhost:3000/schedule
```
Example response:
```
{"message":"Full Schedule fetched successfully","schedule":[{"id":1,"line":"Lakeshore","departure":"800","arrival":"900"},{"id":2,"line":"Lakeshore","departure":"1000","arrival":"1100"},{"id":3,"line":"Lakeshore","departure":"1200","arrival":"1300"},{"id":4,"line":"Lakeshore","departure":"1400","arrival":"1500"},{"id":5,"line":"Lakeshore","departure":"1600","arrival":"1700"},{"id":6,"line":"Barrie","departure":"730","arrival":"930"},{"id":7,"line":"Barrie","departure":"1030","arrival":"1230"},{"id":8,"line":"Barrie","departure":"1230","arrival":"1430"},{"id":9,"line":"Barrie","departure":"1430","arrival":"1630]}
```

#### 2. Get Schedule By Line
```http
   GET /schedule/:line
```
Example end point on local system
```
http://localhost:3000/schedule/Lakeshore
```
Example response:
```
{"message":"Found 5 train schedule for line Lakeshore","schedule":[{"id":1,"line":"Lakeshore","departure":"800","arrival":"900"},{"id":2,"line":"Lakeshore","departure":"1000","arrival":"1100"}]}
```

#### 3. Get Schedule By Line and Departure Time
```http
   GET /schedule/:line/:departure
```
Example end point on local system
```
http://localhost:3000/schedule/Lakeshore/12:00pm
```
Example response:
```
{"message":"Found 1 train schedule for line Lakeshore","schedule":[{"id":3,"line":"Lakeshore","departure":"1200","arrival":"1300"}]}
```



