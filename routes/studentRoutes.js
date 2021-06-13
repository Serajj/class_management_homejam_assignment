const express = require("express");
const { validate, ValidationError, Joi } = require('express-validation');
const { getMyClasses } = require("../controllers/studentController");

const studentMiddleware = require("../middleware/studentMiddleware");

const { addClassStudentValidation, updateClassValidation, deleteClassValidation } = require("../validations/validations");
const router = express.Router();

router.get('/', [studentMiddleware], getMyClasses)



module.exports = router