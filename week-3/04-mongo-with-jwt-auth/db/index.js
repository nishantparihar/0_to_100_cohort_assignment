const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@kaio-kan.6vbhyj4.mongodb.net/test`);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String, 
    password: String,
    courses: [mongoose.Schema.Types.ObjectId]
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String, 
    password: String,
    purchasedCourses: [mongoose.Schema.Types.ObjectId]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String, 
    description: String, 
    price: Number, 
    imageLink: String,
    published:Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}