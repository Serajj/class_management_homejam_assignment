const db = require("../config/database")
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getUsers = async (req, res) => {

    let body = req.body;
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
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        type: "Student",
        roleId: 3,
    });

    await data.save().then(() => {
        console.log("Registered Successfully !");
    }).catch(err => {
        console.log("Error : " + err.message);
        return res.status(200).json({ success: false, message: "Database error :", error: err.message })
    });

    const token = getSignInToken(data);
    return res.status(200).json({ success: true, message: "Registered successfully !!", token: token, data: { id: data.id, name: data.firstName + " " + data.lastName, email: data.email, type: data.type } })


}


getSignInToken = user => {
    return jwt.sign({
        id: user.id,
        type: user.type,
        roleId: user.roleId,
        name: user.firstName + " " + user.lastName,
        email: user.email
    }, "mynameisseraj", { expiresIn: "6h" })
}

getUserData = user => {
    return ({
        id: user.id,
        type: user.phone,
        name: user.firstName + " " + user.lastName,
        email: user.email
    })
}

module.exports = {
    getUsers,
    registerUser
}