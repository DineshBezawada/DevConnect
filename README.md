S02 Ep03 :-Create Our Express Server (01/08/2025)
Dev Connect:

1. Create new repo
2. Add express using npm i express
3. Add nodemon using npm i -g nodemon or sudo npm i -g nodemon (not added in package.json)
4. add mongoose using npm i mongoose
5. add SRC folder and APP.js file
6. Add server using express app.listen(3000)
7. Know about node_modules, package.json, package-lock.json
8. Difference between "^" and "~" in package.json
9. Refer the below Code

const express = require('express');

const app = express();
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

app.use((req,res)=>{
res.send("Hello from DevTinder Node Server");
});
i.e:- Callback function inside app.use

                    (req,res)=>{
                    res.send("Hello from DevTinder Node Server");
                    } is called as "REQUEST HANDLER".

app.use("/user",(req,res)=>{
res.send("Hello from User Route");
});

S02 Ep04 :- Routing and Request Handlers (03/08/2025)

1. Order of the Routes matter

Examples:-
Case1:
app.use('/',()=>{})
app.use('/test',()=>{})
Only get "/" because it already included in route

Case2:
app.use('/test',()=>{})
app.use('/',()=>{})
Both routes will work

2. Install Postman
3. Login and Create Workspace and inside workspace create collection
4. Test local API
5. Play with routes and route extensions
6. Write a logic to handle GET, POST, PUT, PATCH, DELETE and test in Postman
7. Explore routing and use of ?, +, (), \* in the routes
8. Use Regex /a/, /.\*abc$/
9. Reading the query params in the routes
10. Reading the Dynamic Routes

S02 Ep05 :-

1. Multiple Route handlers - Play with the code
2. next() inside route handlers
3. next function and errors along with res.send()
4. app.use('/user', rH1,[rH2,rH3],rH4,rH5);
5. What are Middlerwares ?
6. How express Js hadles requests behind the scenes. 

   What are Middlewares in Node.js?
   In Node.js (with Express.js), a middleware is a function that has access to the request (req), response (res), and next function. It can:

Modify the request or response objects.

End the request-response cycle.

Or pass control to the next middleware using next().

Simple Middleware Example
We'll create a simple Express server with:

One middleware that logs the request method and URL.

One route (/hello) that returns a message.

const express = require('express');
const app = express();

// ✅ Middleware function
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pass control to the next handler
};

// ✅ Use the middleware
app.use(loggerMiddleware);

// ✅ Single route
app.get('/hello', (req, res) => {
  res.send('Hello, Middleware!');
});

// ✅ Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

Every request goes through loggerMiddleware.

It logs the HTTP method and URL.

Then it calls next() to pass control to the /hello route handler.

✅ Output Example
When you visit http://localhost:3000/hello,
console logs: [2025-08-07T14:00:00.000Z] GET /hello
And in the browser, you see:
Hello, Middleware!

7. Difference between App.use and App.all in NodeJs(Express).

In Express.js, both app.use() and app.all() are used to define middleware, but they serve different purposes. Here's a clear comparison:

🔹 app.use()
Purpose: Registers middleware functions.

Applies to: All HTTP methods (GET, POST, PUT, DELETE, etc.).

Path Matching: Matches the route and all its sub-paths.

Typical Use: Logging, authentication, body parsing, etc.

Example:
js
Copy
Edit
app.use('/api', (req, res, next) => {
  console.log('Middleware for /api and subroutes');
  next();
});
This will run for:

/api

/api/users

/api/products/123

🔹 app.all()
Purpose: Handles all HTTP methods for a specific route.

Applies to: Only the specified route.

Path Matching: Exact route match (can use wildcards).

Typical Use: Handling all methods on a route (e.g., custom 404, CORS preflight, etc.).

Example:
js
Copy
Edit
app.all('/test', (req, res) => {
  res.send(`Handled ${req.method} request at /test`);
});
This will run for:

GET /test

POST /test

PUT /test

etc.

🔸 Key Differences
Feature	                       app.use()	                      app.all()
HTTP Methods	       All (but for middleware only)	     All (for routing/handling requests)
Path Matching	       Path + sub-paths	                     Exact path (unless using wildcards)
Use Case	          Middleware (auth, logging, etc.)	     Route handling for all HTTP methods
next() usage	      Typically calls next() to continue	 Often ends request with res.send()

✅ Quick Summary:
Use app.use() for middleware that should apply broadly (e.g., across all routes).

Use app.all() when you want to handle any HTTP method for a specific path.

8. Write dummy middleware for admin
9. Write dummy middleware for all user routes except /user/login
10. Error Handling
11. Global error Handling using Middleware (app.use('/'))
12. Error Handling for each route using try catch blocks.
