require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWTPASSWORD;

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers["token"].replace("Bearer ", "");


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

module.exports = userMiddleware;