import { Router } from "express";
import pool from "../database/db_connect.js";
import { generateToken } from "../utils/generate_token.js";
const authRouter = Router();


authRouter.post('/register' , (request,response)=>{
    const { username , email , password } = request.body;

    const insertValue = [ username , email , password];

    pool.query(`INSERT INTO tbl_user (username,email,password) VALUES (?,?,?)`,insertValue,(error,result)=>{
        if(error) response.status(500).json({
            "message" : "Please Provide Valid Request"
        })
        const token = generateToken({username : username});
        response.status(200).json({
            message : "Register Success",
            token   : token
        })
    })
}) 

authRouter.post('/login' , (request,response) => {
    const { email , password } = request.body;

    pool.query(`SELECT username FROM tbl_user WHERE email = ? AND password = ?`,[email,password],(error,row)=>{
        if(error) response.status(500).json({
            message : "Please Provide valid request"
        })
        const data = row[0];
        const username = data.username;
        const token = generateToken({username: username});
        response.status(200).json({
            message : "Login Success",
            token : token
        })
    })
})
export default authRouter;