
const { body } = require("express-validator");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const db = require("../config/database")
const JoinedClass = db.JoinedClasses;
const User = db.users;
const Classes = db.classes;


const readClassStudents = async (req, res) => {
    var data = await Classes.findAll({
        where: {
            tutor_id: req.user.id
        }
    });


    if (data) {
        return res.status(200).json({ success: true, message: "Classes fetched successfully !!", classes: data })
    }
    return res.status(403).json({ success: false, message: "You don't have any Class , Create first ." })

}

const getStudentsbyclassID = async (req, res) => {
    var data = await Classes.findOne({
        where: {
            tutor_id: req.user.id,
            id: req.params.class_id
        }
    });

    if (data) {

        const [results, metadata] = await sequelize.query("SELECT u.id,u.first_name,u.last_name,u.email FROM joined_classes INNER JOIN users u ON u.id = joined_classes.user_id where joined_classes.class_id=" + req.params.class_id);

        console.log(results);
        return res.status(200).json({ success: true, message: "Classes fetched successfully !!", data: { class_details: data, students: results } })
    }
    return res.status(403).json({ success: false, message: "You don't have any Class , Create first ." })

}



const createStudentInClass = async (req, res) => {

    let body = req.body;
    body.instructor_id = req.user.id;

    const istutorExist = await User.findByPk(body.student_id);
    if (!istutorExist) {
        return res.status(403).json({ success: false, message: "Student not exist ." })
    }

    const isClassexist = await Classes.findByPk(body.class_id);
    if (!isClassexist) {
        return res.status(403).json({ success: false, message: "Class not exist ." })
    }

    const isStudentExist = await JoinedClass.findOne({ where: { class_id: body.class_id, user_id: body.student_id } });
    //console.log(isStudentExist)
    if (isStudentExist) {
        return res.status(403).json({ success: false, message: "Student alredy registered in class ." })
    }


    let data = JoinedClass.build({ class_id: body.class_id, user_id: body.student_id });

    await data.save().then(() => {
        console.log("Student Added Successfully !");
    }).catch(err => {
        console.log("Error : " + err.message);
        return res.status(200).json({ success: false, message: "Database error :", error: err.message })
    });

    let change_number_of_students = await Classes.findOne({ where: { id: body.class_id } });
    change_number_of_students.number_of_students = parseInt(change_number_of_students.number_of_students) + 1;

    change_number_of_students.save();

    return res.status(200).json({ success: true, message: "Studedent added successfully !! .", data: data })

}

const updateStudentInClass = async (req, res) => {

    let body = req.body;
    const data = await Classes.findByPk(body.class_id);

    if (body.tutor_id) {
        const istutorExist = await User.findByPk(body.tutor_id);
        if (!istutorExist) {
            return res.status(403).json({ success: false, message: "Tutor not exist ." })
        }
    }


    if (data === null) {
        return res.status(403).json({ success: false, message: "You don't have any Class , Create first ." })
    } else {
        if (data.instructor_id) {
            data.name = body.name ? body.name : data.name;
            data.tutor_id = body.tutor_id ? body.tutor_id : data.tutor_id;
            data.save()
            return res.status(200).json({ success: true, message: "Updated successfully !!", data: data })
        } else {
            return res.status(200).json({ success: true, message: "You can manage only your classes !!" })
        }

    }

}

const deleteStudentFromClass = async (req, res) => {

    let body = req.body;

    const classdata = await Classes.findByPk(body.class_id);

    if (classdata === null) {
        return res.status(403).json({ success: false, message: "Class not exist with class_id  : " + body.class_id })
    }


    const data = await JoinedClass.findOne({
        where: {
            class_id: body.class_id,
            user_id: body.student_id
        }
    });

    if (data === null) {
        return res.status(403).json({ success: false, message: "Student is not registered in this class with class_id  : " + body.class_id })
    } else {

        if (classdata.tutor_id == req.user.id) {
            data.destroy();

            let change_number_of_students = await Classes.findOne({ where: { id: body.class_id } });
            change_number_of_students.number_of_students = parseInt(change_number_of_students.number_of_students) - 1;

            change_number_of_students.save();

            return res.status(200).json({ success: true, message: "Removed successfully !!" })
        } else {
            return res.status(200).json({ success: false, message: "You can delete/manage only your your class !!" })
        }

    }

}


module.exports = {
    createStudentInClass,
    readClassStudents,
    updateStudentInClass,
    deleteStudentFromClass,
    getStudentsbyclassID
}