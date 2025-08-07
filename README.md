S02 Ep03 :-Create Our Express Server (01/08/2025)
Dev Connect:
1. Create new repo
2. Add express using npm i express
3. Add nodemon using npm i -g nodemon  or sudo npm i -g nodemon (not added in package.json)
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
7. Explore routing and use of ?, +, (), * in the routes 
8. Use Regex /a/, /.*abc$/
9. Reading the query params in the routes
10. Reading the Dynamic Routes

S02 Ep05 :-
1. Multiple Route handlers - Play with the code 
2. next() inside route handlers
3. next function and errors along with res.send()
4. app.use('/user', rH1,[rH2,rH3],rH4,rH5);

