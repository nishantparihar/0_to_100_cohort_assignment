const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const userName = req.headers["username"];
    const passWord = req.headers["password"];

    const data = await Admin.findOne({username : userName});

    if(data){
        if(data["password"] === passWord){
            next();
        }
        else{
            return res.status(404).send("wrong username or password");
        }
    }
    else
        return res.status(404).send("Admin not found");
    
}

module.exports = adminMiddleware;