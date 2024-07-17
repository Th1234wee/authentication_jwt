import express from 'express';
import { config } from 'dotenv';
import pool from './database/db_connect.js';
import authRouter from './auth/authRoutes.js';
config();
const app = express();
const port  = process.env.port  | 3000;
//middleware 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//database connection
pool.getConnection((error,connection) => {
    if(error) console.log("Connection Failed");
    console.log("Connection Success");
    connection.release();
});
//route register
app.use("/user",authRouter);


app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
});






