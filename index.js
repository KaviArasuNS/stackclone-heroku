import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
// import { usersRouter } from "./routes/users.js";



dotenv.config();
const app = express();
app.use(cors());

const PORT= process.env.PORT;
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected");
  return client;
}
export const client = await createConnection();




// Hackathon 2 Database

app.get('/', function (req, res) {
  res.send('Hello World')
})


// HOMEPAGE ROUTER
app.post('/stack', async function (req, res){
  const data = req.body;
  console.log(data);
  const result = await client.db("guvi").collection("stack").insertMany(data);
  res.send(result);
})


app.get('/stack', async function (req, res) {

  const  stack = await client.db("guvi").collection("stack").find({}).toArray();
  console.log(stack);
  res.send(stack)
})


// COMPANIES ROUTER
app.post('/companies', async function (req, res){
  const data = req.body;
  console.log(data);
  const result = await client.db("guvi").collection("companies").insertMany(data);
  res.send(result);
})

app.get('/companies', async function (req, res) {

  const  result = await client.db("guvi").collection("companies").find({}).toArray();
  console.log(result);
  res.send(result);
})




app.listen(PORT, () =>{
  console.log(`server is running on port ${PORT}`);
})