const express = require("express");
const { getUsers, registerUser } = require("../controllers/authController");
const router = express.Router();


router.get('/', (req, res) => res.send('Hello this is api route!'))
router.post('/login', getUsers)
router.put('/register', registerUser)
router.get("")


module.exports = router