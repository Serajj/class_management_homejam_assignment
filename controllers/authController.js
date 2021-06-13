const db = require("../config/database")
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getUsers = async (req, res) => {

    let body = req.body;

    if (body.email == null || body.password == null) {
        return res.status(403).json({ success: false, message: "Either email or password is missing!" })
    }


    let checkUser = await User.findOne({
        where: {
            email: body.email
        }
    })

    if (!checkUser) {
        return res.status(403).json({ error: "Invalid User/password!" })
    }
    const isValid = await bcrypt.compare(body.password, checkUser.password);
    console.log(isValid);
    if (!isValid) {
        return res.status(405).json({ error: "Incorrect Password" })
    }


    else {
        const token = getSignInToken(checkUser);
        return res.status(200).json({ success: true, message: "Login Successfull!!", token: token, data: getUserData(checkUser) })
    }


}

const registerUser = async (req, res) => {

    const body = req.body;

    // checking for null values
    if (body.first_name == null || body.last_name == null || body.email == null || body.password == null) {
        return res.status(403).json({ success: false, message: "All fields are mandatory. first_name , last_name , email , type and password" })
    } else {
        console.log(body);
    }

    //checking for empty value
    if (body.first_name == "" || body.last_name == "" || body.email == "" || body.password == "") {
        return res.status(403).json({ success: false, message: "All fields are mandatory. first_name , last_name , email , type and password" })
    } else {
        console.log(body);
    }

    //checking email regression
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(body.email).toLowerCase())) {
        return res.status(403).json({ success: false, message: "Please provide email in the format : username@domain.com" })
    }

    //checking type
    if (body.type == "Instructor" || body.type == "Teacher" || body.type == "Student") {
        console.log(body.type);
    } else {
        return res.status(403).json({ success: false, message: "Type should be Instructor , Teacher or Student" })
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt)
    body.password = passwordHash;



    console.log(body);

    let checkUser = await User.findOne({
        where: {
            email: body.email
        }
    })

    if (checkUser) {
        return res.status(403).json({ success: false, message: "Email already exist, Please login!" })
    }


    let data = await User.build({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        type: body.type,
        //prividind default role id for future extension
        roleid: 3,
    });

    await data.save().then(() => {
        console.log("Registered Successfully !");
    }).catch(err => {
        console.log("Error : " + err.message);
        return res.status(200).json({ success: false, message: "Database error :", error: err.message })
    });

    const token = getSignInToken(data);
    return res.status(200).json({ success: true, message: "Registered successfully !!", token: token, data: { id: data.id, name: data.first_name + " " + data.last_name, email: data.email, type: data.type } })


}


getSignInToken = user => {
    return jwt.sign({
        id: user.id,
        type: user.type,
        roleId: user.roleid,
        name: user.first_name + " " + user.last_name,
        email: user.email
    }, "mynameisseraj", { expiresIn: "6h" })
}

getUserData = user => {
    return ({
        id: user.id,
        type: user.type,
        name: user.first_name + " " + user.last_name,
        email: user.email
    })
}

module.exports = {
    getUsers,
    registerUser
}