const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
require('dotenv').config();

const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWTPASSWORD;

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const userName = req.body.username;
    const passWord = req.body.password;

    const data = await User.findOne({username: userName});

    if(data)
        return res.status(409).json({msg : "Username already exist"});
    else{
        const userData = new User({    
            username: userName, 
            password: passWord,
            purchasedCourses: []
        });

        userData.save().then((docs)=>{
            return res.json({message: 'User created successfully'});
        });
    }

});


router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const userName = req.body.username;
    const passWord = req.body.password;
    
    const data = await User.findOne({username : userName});
   

    if(data){
        if(data["password"] === passWord){
            const token = jwt.sign({username: userName}, jwtPassword);
            res.json({token: token});
        }
        else{
            return res.status(404).send("wrong username or password");
        }
    }
    else
        return res.status(404).send("User not found");

});


router.get('/courses', userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const courseList = await Course.find();
    return res.json({courses: courseList});
});


router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic

    const courseId = req.params.courseId;
    const userName = req.headers.username;

    const userData = await User.findOne({username: userName});
    userData["purchasedCourses"].push(courseId);
    userData.save();
    return res.json({ message: 'Course purchased successfully' });
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const userName = req.headers.username;
    const userData = await User.findOne({username: userName});

    if(!userData.purchasedCourses){
        res.json({ courses: [] });
        return;
    }

    const courseList = await Course.find({ _id: { $in: userData.purchasedCourses } });
    return res.json( { purchasedCourses: courseList});
});

module.exports = router