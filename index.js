// const express = require('express'); 
// const { MongoClient } = require('mongodb');

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express()


dotenv.config();
console.log(process.env.MONGO_URL);

const PORT = 4000;



// const MONGO_URL = 'mongodb://127.0.0.1'
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
  const client = new MongoClient(MONGO_URL)
  await client.connect();
  console.log("Mongo is connected");
  return client;

}

const client = await createConnection();



app.get("/movies",async function(request, response){
  
  const movies = await client.db("guvi").collection("movies").find({}).toArray();
  console.log(movies);
  response.send(movies);
})

app.get("/movies/:id", async function(request,response){
  const { id } = request.params;
  console.log(request.params, id);

  // const movie = movies.find((mv) => mv.id===id);
  const movie = await client.db("guvi").collection("movies").findOne({id: id});

  console.log(movie);
  movie ? response.send(movie) : response.send({msg: "Movie not found"});
})


// middleware - express.json() - body - JSON(inbuilt middleware)
app.post("/movies", express.json(), async function(request,response){
  const data = request.body;
  console.log(data);

  // db.movies.insertMany(data)
  const movie = await client.db("guvi").collection("movies").insertMany(data);

  response.send(movie);
})





app.listen(PORT, ()=> console.log(`App started in ${PORT}`));




























// // ctr + c - cut the server
// // const express = require('express'); //importing
// // const { MongoClient } = require("mongodb");
// // const app = express()

// // importing after updating "type": "module" in package.json
// import express from "express";
// // import { MongoClient } from "mongodb";
// // import dotenv from "dotenv" 
// // import { moviesRouter } from "./Routes/movies.js";
// // import cors from "cors";
// // import { usersRouter } from "./Routes/users.js";



// // dotenv.config();


// const app = express();

// // app.use(cors()); // cors called below express;
// const PORT = process.env.PORT;
// // const PORT = process.env.PORT;


// // app.use intercepts all the request and applies express.json() (Inbuilt middleware)
// // app.use(express.json());


// // connecting to MongoDB
// // const MONGO_URL = "mongodb://localhost"  //nodejs - 16
// // const MONGO_URL = "mongodb://127.0.0.1"; // nodejs - 16+


// // const MONGO_URL = process.env.MONGO_URL;
// // async function createConnection(){
// //   const client = new MongoClient(MONGO_URL);
// //   await client.connect();
// //   console.log("MongoDB is connected");
// //   return client;
// // }
// // export const client = await createConnection();


// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


// app.listen(PORT, ()=> console.log(`App started in ${PORT}`));



// // Hackathon 2 Database

// // app.post('/stackflow', async function (req, res){
// //   const data = req.body;
// //   console.log(data);
// //   const result = await client.db("guvi").collection("stack").insertMany(data);
// //   res.send(result);
// // })


// // app.get('/stackflow', async function (req, res) {


// //   const  mobiles = await client.db("guvi").collection("stack").find({}).toArray();
  
// //   res.send(mobiles)
// // })

