const express = require("express");
const { validate, ValidationError, Joi } = require('express-validation')
const { getTeacherList, getClasses, addClasses, classUpdate, classDelete } = require("../controllers/InstructorController");
const instructorMiddleware = require("../middleware/instructorMiddleware");
const { addClassvalidation, updateClassValidation } = require("../validations/validations");
const router = express.Router();


router.get('/', [instructorMiddleware], getClasses)
router.get('/getTeachers', [instructorMiddleware], getTeacherList)
router.post('/addClass', [instructorMiddleware, validate(addClassvalidation, {}, {})], addClasses)
router.post('/updateClass', [instructorMiddleware, validate(updateClassValidation, {}, {})], classUpdate)
router.post('/deleteClass', [instructorMiddleware, validate(updateClassValidation, {}, {})], classDelete)



module.exports = router