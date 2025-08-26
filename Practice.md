1.Cricket Team
Create two files app.js and a database file cricketTeam.db consisting a table cricket_team.

Write APIs to perform operations on the table cricket_team containing the following columns,

Columns	Type
player_id	INTEGER
player_name	TEXT
jersey_number	INTEGER
role	TEXT
API 1
Path: /players/
Method: GET
Description:
Returns a list of all players in the team

Response
[
  {
    playerId: 1,
    playerName: "Lakshman",
    jerseyNumber: 5,
    role: "All-rounder"
  },

  ...
]
API 2
Path: /players/
Method: POST
Description:
Creates a new player in the team (database). player_id is auto-incremented

Request
{
  "playerName": "Vishal",
  "jerseyNumber": 17,
  "role": "Bowler"
}
Response
Player Added to Team
API 3
Path: /players/:playerId/
Method: GET
Description:
Returns a player based on a player ID

Response
{
  playerId: 1,
  playerName: "Lakshman",
  jerseyNumber: 5,
  role: "All-rounder"
}
API 4
Path: /players/:playerId/
Method: PUT
Description:
Updates the details of a player in the team (database) based on the player ID

Request
{
  "playerName": "Maneesh",
  "jerseyNumber": 54,
  "role": "All-rounder"
}
Response
Player Details Updated

API 5
Path: /players/:playerId/
Method: DELETE
Description:
Deletes a player from the team (database) based on the player ID

Response
Player Removed
 

Use npm install to install the packages.

Export the express instance using the default export syntax.

Use Common JS module syntax.



Here is the task deatils.

2.Movies
Given two files app.js and a database file moviesData.db consisting of two tables movie and director.

Write APIs to perform CRUD operations on the tables movie, director containing the following columns,

Movie Table

Columns	Type
movie_id	INTEGER
director_id	INTEGER
movie_name	TEXT
lead_actor	TEXT
Director Table

Columns	Type
director_id	INTEGER
director_name	TEXT
API 1
Path: /movies/
Method: GET
Description:
Returns a list of all movie names in the movie table

Response
[
  {
    movieName: "Captain America: The First Avenger",
  },

  ...
]
API 2
Path: /movies/
Method: POST
Description:
Creates a new movie in the movie table. movie_id is auto-incremented

Request
{
  "directorId": 6,
  "movieName": "Jurassic Park",
  "leadActor": "Jeff Goldblum"
}
Response
Movie Successfully Added
API 3
Path: /movies/:movieId/
Method: GET
Description:
Returns a movie based on the movie ID

Response
{
  movieId: 12,
  directorId: 3,
  movieName: "The Lord of the Rings",
  leadActor: "Elijah Wood",
}
API 4
Path: /movies/:movieId/
Method: PUT
Description:
Updates the details of a movie in the movie table based on the movie ID

Request
{
  "directorId": 24,
  "movieName": "Thor",
  "leadActor": "Christopher Hemsworth"
}
Response
Movie Details Updated

API 5
Path: /movies/:movieId/
Method: DELETE
Description:
Deletes a movie from the movie table based on the movie ID

Response
Movie Removed
API 6
Path: /directors/
Method: GET
Description:
Returns a list of all directors in the director table

Response
[
  {
    directorId: 1,
    directorName: "Joe Johnston",
  },

  ...
]
API 7
Path: /directors/:directorId/movies/
Method: GET
Description:
Returns a list of all movie names directed by a specific director

Response
[
  {
    movieName: "Captain Marvel",
  },

  ...
]
 

Use npm install to install the packages.

Export the express instance using the default export syntax.

Use Common JS module syntax.

 

3.Covid-19 India
Given two files app.js and a database file covid19India.db consisting of two tables state and district.

Write APIs to perform CRUD operations on the tables state, district containing the following columns,

State Table

Columns	Type
state_id	INTEGER
state_name	TEXT
population	INTEGER
District Table

Columns	Type
district_id	INTEGER
district_name	TEXT
state_id	INTEGER
cases	INTEGER
cured	INTEGER
active	INTEGER
deaths	INTEGER
API 1
Path: /states/
Method: GET
Description:
Returns a list of all states in the state table

Response
[
  {
    stateId: 1,
    stateName: "Andaman and Nicobar Islands",
    population: 380581
  },

  ...
]
API 2
Path: /states/:stateId/
Method: GET
Description:
Returns a state based on the state ID

Response
{
  stateId: 8,
  stateName: "Delhi",
  population: 16787941
}
API 3
Path: /districts/
Method: POST
Description:
Create a district in the district table, district_id is auto-incremented

Request
{
  "districtName": "Bagalkot",
  "stateId": 3,
  "cases": 2323,
  "cured": 2000,
  "active": 315,
  "deaths": 8
}
Response
District Successfully Added
API 4
Path: /districts/:districtId/
Method: GET
Description:
Returns a district based on the district ID

Response
{
  districtId: 322,
  districtName: "Haveri",
  stateId: 36,
  cases: 2816,
  cured: 2424,
  active: 172,
  deaths: 220,
}
API 5
Path: /districts/:districtId/
Method: DELETE
Description:
Deletes a district from the district table based on the district ID

Response
District Removed

API 6
Path: /districts/:districtId/
Method: PUT
Description:
Updates the details of a specific district based on the district ID

Request
{
  "districtName": "Nadia",
  "stateId": 3,
  "cases": 9628,
  "cured": 6524,
  "active": 3000,
  "deaths": 104
}
Response

District Details Updated

API 7
Path: /states/:stateId/stats/
Method: GET
Description:
Returns the statistics of total cases, cured, active, deaths of a specific state based on state ID

Response
{
  totalCases: 724355,
  totalCured: 615324,
  totalActive: 99254,
  totalDeaths: 9777
}

API 8
Path: /districts/:districtId/details/
Method: GET
Description:
Returns an object containing the state name of a district based on the district ID

Response

{
  stateName: "Maharashtra"
}

 

Use npm install to install the packages.

Export the express instance using the default export syntax.

Use Common JS module syntax.