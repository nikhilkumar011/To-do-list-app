const express = require('express');
const Dbconnection = require('./DBconnection.js');
const cors = require('cors');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json()); 

const dotenv = require('dotenv');
dotenv.config();
Dbconnection();

const todoRouter = require('./route/todoRoute.js');
app.use('/todos',todoRouter);

app.get('/',(req,res)=>{
    res.send("Hello, Todo");
})

app.listen(PORT,()=>{
    console.log(`up and running at http://localhost:${PORT}`);
})

