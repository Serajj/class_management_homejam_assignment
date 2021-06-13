const express = require("express");
const { validate, ValidationError, Joi } = require('express-validation');
const { readClassStudents, createStudentInClass, updateStudentInClass, deleteStudentFromClass, getStudentsbyclassID } = require("../controllers/teacherController");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const { addClassStudentValidation, updateClassValidation, deleteClassValidation } = require("../validations/validations");
const router = express.Router();

router.get('/', [teacherMiddleware], readClassStudents)
router.get('/getStudents/:class_id', [teacherMiddleware], getStudentsbyclassID)
router.post('/add', [teacherMiddleware, validate(addClassStudentValidation, {}, {})], createStudentInClass)
router.post('/update', [teacherMiddleware, validate(updateClassValidation, {}, {})], updateStudentInClass)
router.post('/delete', [teacherMiddleware, validate(deleteClassValidation, {}, {})], deleteStudentFromClass)


module.exports = router