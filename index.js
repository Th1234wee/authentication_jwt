import express from 'express';
import { config } from 'dotenv';
import pool from './database/db_connect.js';
import authRouter from './auth/authRoutes.js';
import validateToken from './auth/jwt_validate.js';
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
//protected route (required valid token)
app.get('/user/getUser' , validateToken , (request,response) => {
    response.send("Hello World");
})
app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
});






