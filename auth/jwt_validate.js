import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const validateToken = (request,response,next) => {
    const authHeader = request.headers['authorization'];
    if(authHeader){
        const authToken = authHeader.split(" ")[1].trim();
        jwt.verify(authToken , process.env.jwt_secret_key,(error , result) => {
            if(error) return response.status(401).json({
                message : "Unauthorized"
            })
            next();
        })
    }
    else{
        return response.status(401).json({
            message : "Unauthorized"
        })
    }
}
export default validateToken;