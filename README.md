# Go-Train-Schedule-App

# Table of Contents
1. [ Installation ](#installation)
2. [ Endpoints ](#endpoints)
3. [ Usuage ](#Usage)
4. [ Tests ](#test)
5. [ Thought process ](#thought)
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

1. Separation of concerns: The code has been organized into different modules, with each module having a specific responsibility. For example, there is a folder (/backend/app) for handling the API routes, a module for handling the train timetable data, and a module for parsing the input parameters. So that in future , if we integrate front end code in this app, there is a clear seggragation of concepts.
2. Created a util.js file to handle the utlitiy method to convert 12hr timr format to 24hr format. This file can be scaled further to add more util methods such as convertTo24Hour 
3. Single Responsibility Principle: Each function or module has a single responsibility, and is focused on accomplishing that responsibility. For example, the getTrainScheduleByLine function is responsible for loading the train timetable data based on train line input, while the getTrainScheduleByDeparture function is responsible for filtering the timetable data based on the input parameters such as train number along with departure time.
4. Asynchronous programming: Asynchronous programming has been used throughout the code to ensure that the API can handle multiple requests at the same time without blocking the event loop.
5. Error handling
   - 500 incase there is an error thrown by API
   - 404 if not found
   - 200 GET API success
6. Memory cache concept ahs been added to avoid hitting the api for repoeated request
7. Handle various scenarios related to 12hr and 24hr format inputs for simplicity 

<a name="improve"></a>
## Areas to improve code and concepts to scale the app's performance 
1. Making another end point for fetching the schedule for the arrival time
2. To make code more structured, add saggregation for api routes and the methods to interate the Json Data
3. Create one shared method to handle all the GET requests and include the memory-caache logic also in it, so that its not redundent
4. If your API is returning a large amount of data, implementing pagination to split the data in small chunks and also increases performance on FE
5. Add more unit test cases as a best practice to make the code quality stronger, so that code is less error prone.
6. Using databses to store the timetable data like MySQL, MongoDB, or PostgreSQL. Database queries can be optimised for dat feteching
7. Improve caching strategy - althogh chaching concept is added to the api. this can further be improved by using more robust caching services
8. CDN : for a use case to serve a global audience, using a content delivery network (CDN) can help to improve performance by caching data in multiple geographic locations around the world. This can reduce latency and improve response times for clients in different regions.
9. Although this api is public, but if this data was sensitive ,we want to consider adding authentication and authorization to ensure that only authorized users can access the API and its data.
   
   
 



