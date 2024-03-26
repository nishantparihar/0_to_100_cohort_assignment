// Middleware for handling auth
require('dotenv').config();
const jwt = require("jsonwebtoken");

const jwtPassword = process.env.JWTPASSWORD;
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers["token"].replace("Bearer ", "");;

    try{
        const decoded = jwt.verify(token, jwtPassword);
        
        if(decoded){
            req.headers["username"] = decoded.username;
            next();
        } 
        return;
    }catch(err){
        return res.status(404).json({msg : "Failed Authorization"});
    }

}

module.exports = adminMiddleware;