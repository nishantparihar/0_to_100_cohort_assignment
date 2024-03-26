const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
require('dotenv').config();

const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWTPASSWORD;

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const userName = req.body.username;
    const passWord = req.body.password;

    const data = await Admin.findOne({username : userName});

    if(data){
        return res.status(409).send("User already exist");
    }
    else{
        const userDetails = new Admin({
            username: userName, 
            password: passWord,
            courses: []
        });
        userDetails.save().then((docs)=>{
            return res.json({ message: 'Admin created successfully' });
        })
    }

});


router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const userName = req.body.username;
    const passWord = req.body.password;

    const data = await Admin.findOne({username : userName});

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
        return res.status(404).send("Admin not found");
});


router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const userName = req.headers["username"];
    const data = await Admin.findOne({username : userName});

    const courseDetails = new Course({
        title: req.body.title, 
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: true
    });

    courseDetails.save().then((docs) => {
        data["courses"].push(docs._id);
        data.save();
        return res.json({message: 'Course created successfully', courseId: docs._id});
    });

});


router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const userName = req.headers["username"];
   
    const data = await Admin.findOne({username : userName});

    if(!data){
        res.json({ courses: [] });
        return;
    }
        

    const courseList = await Course.find({ _id: { $in: data.courses } });
    res.json({courses: [courseList]});
    return;
});



module.exports = router;