const express = require("express");
const { getUsers, registerUser } = require("../controllers/authController");
const { userValidation } = require("../validations/validations");
const router = express.Router();


router.get('/', (req, res) => res.send('Hello this is api route!'))
router.post('/login', getUsers)
router.post('/register', registerUser)
router.get("")


module.exports = router