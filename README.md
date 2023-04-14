# Go-Train-Schedule-App

# Table of Contents
1. [ Installation ](#installation)
2. [ Endpoints ](#endpoints)
3. [ Usage ](#Usage)
4. [ Tests ](#test)
5. [ Thought Process ](#thought)
6. [ Areas to Improve ](#improve)




<a name="installation"></a>
## Installation
To install this API, you'll need to have Node.js and npm installed on your system.

1. Clone the repository
```bash
gh repo clone resham04/Go-Train-Schedule-App
```
2. Install dependencies:
```bash
npm install --save express
```
<a name="Usage"></a>
## Usage
```bash
node server.js OR nodemon server
```
This will start the server on port 3000 by default. You can change the port by setting the PORT environment variable.
To make requests to the API, send HTTP requests to the below endpoint, where it will display the Welcome page of the app. 
Example
```bash
http://localhost:3000/
```
<a name="endpoints"></a>
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

<a name="test"></a>
## Tests
To run the tests for this API, run the following command in your terminal:
```bash
npm test
```

<a name="thought"></a>
## Thought process

1. Separation of concerns: The code has been divided into different modules, each of which is in charge of a particular task. A test module is used for managing tests, and there is a folder (/backend/app) for managing API routes and communication with time table json data that is saved in a separate JSON file. In order to clearly separate the concepts incase this is scaled in future to add more behaviours such as integration with UI code.
2. A util.js file was created to handle the functionality technique to convert 12hr time to 24hr time. This file can be expanded even further to include other useful techniques like convertTo24Hour.
3. The single responsibility principle states that each function or module has a single task that it is responsible for completing. For instance, the getTrainScheduleByLine function loads the train schedule data based on input for the train line, whereas the getTrainScheduleByDeparture function filters the schedule data based on input for the train number and departure time.
4. Use of asynchronous programming has been made throughout the code to guarantee that the API can handle several requests concurrently without causing the event loop to become stuck.
5. Error handling - 500 in the event that an API error is thrown - 404 if the requested page cannot be located - 200 GET API success
6. A memory cache notion has been implemented to prevent repeatedly accessing the api.
7. For simplicity, handle a variety of scenarios involving inputs in 12hr and 24hr format.

<a name="improve"></a>
## Areas to improve code and concepts to scale the app's performance 
1. Making another end point for fetching the schedule for the arrival time.
2. To make code more structured, add segregation for api routes and the methods to iterate the Json Data  to handle different use cases example- to fetch the data for Go buses.
3. Create one shared method to handle all the GET requests and include the memory-cache logic also in it, so that its not redundant.
4. If your API is returning a large amount of data, implementing pagination to split the data in small chunks and also increases performance on FE
5. Add more unit test cases as a best practice to make the code quality stronger, so that code is less error prone.
6. Using databases to store the timetable data like MySQL, MongoDB, or PostgreSQL. Database queries can be optimised for data fetching
7. Improve caching strategy - although the caching concept is added to the api. this can further be improved by using more robust caching services
8. CDN : for a use case to serve a global audience, using a content delivery network (CDN) can help to improve performance by caching data in multiple geographic locations around the world. This can reduce latency and improve response times for clients in different regions.
9. Although this api is public, if this data was sensitive ,we want to consider adding authentication and authorization to ensure that only authorised users can access the API and its data.

   
   
 



