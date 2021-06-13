
const { body } = require("express-validator");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const db = require("../config/database")
const JoinedClass = db.JoinedClasses;
const User = db.users;
const Classes = db.classes;


const getMyClasses = async (req, res) => {

    const [results, metadata] = await sequelize.query("SELECT c.id as class_id,c.name as class_name,u.first_name as instructor_first_name,u.last_name as instrutor_last_name,u.email as instructor_email,t.first_name as tutor_first_name,t.last_name as tutor_last_name,t.email as tutor_email FROM joined_classes INNER JOIN classes c ON c.id = joined_classes.class_id INNER JOIN users u ON u.id = c.instructor_id INNER JOIN users t ON t.id = c.tutor_id where joined_classes.user_id=" + req.user.id);


    if (results) {
        return res.status(200).json({ success: true, message: "Welcome " + req.user.name + ", You are enrolled in following classes: ", classes: results })
    }
    return res.status(403).json({ success: false, message: "You don't have any Class , Create first ." })

}







module.exports = {
    getMyClasses
}