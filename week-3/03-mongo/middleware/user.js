const { User } = require("../db/index")

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const userName = req.headers["username"];
    const passWord = req.headers["password"];

    const data = await User.findOne({username : userName});

    if(data){
        if(data["password"] === passWord){
            next();
        }
        else{
            return res.status(404).send("wrong username or password");
        }
    }
    else
        return res.status(404).send("User not found");
}

module.exports = userMiddleware;