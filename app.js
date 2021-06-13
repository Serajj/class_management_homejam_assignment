const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { validate, ValidationError, Joi } = require('express-validation');

//importing routes
const authRoutes = require('./routes/authRoute');
const instructorRoutes = require('./routes/instructorRoutes');
const teacherRoutes = require('./routes/teacherRoute');
const studentRoutes = require('./routes/studentRoutes');
//end Importing Routes
require('./config/database');



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());



//assigning routes
app.use('/api', authRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to E-learning");
});

//defining validation routes
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})
app.listen(3000, () => {
    console.log("Server started at port 3000");
})