
const { body } = require("express-validator");
const db = require("../config/database")
const Classes = db.classes;
const User = db.users;


const getClasses = async (req, res) => {
    let data = await Classes.findAll({
        where: {
            instructor_id: req.user.id
        }
    });

    if (data) {
        return res.status(200).json({ success: true, message: "Classes fetched successfully !!", data: data })
    }
    return res.status(403).json({ success: false, message: "You don't have any Class , Create first ." })

}



const addClasses = async (req, res) => {

    let body = req.body;
    body.instructor_id = req.user.id;

    const istutorExist = await User.findByPk(body.tutor_id);
    if (!istutorExist) {
        return res.status(403).json({ success: false, message: "Tutor not exist ." })
    }

    let data = Classes.build(body);

    await data.save().then(() => {
        console.log("Registered Successfully !");
    }).catch(err => {
        console.log("Error : " + err.message);
        return res.status(200).json({ success: false, message: "Database error :", error: err.message })
    });
    return res.status(200).json({ success: true, message: "Class added successfully !! .", data: data })

}

const classUpdate = async (req, res) => {

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
        if (data.instructorId) {
            data.name = body.name ? body.name : data.name;
            data.tutor_id = body.tutor_id ? body.tutor_id : data.tutor_id;
            data.save()
            return res.status(200).json({ success: true, message: "Updated successfully !!", data: data })
        } else {
            return res.status(200).json({ success: true, message: "You can manage only your classes !!" })
        }

    }

}

const classDelete = async (req, res) => {

    let body = req.body;
    const data = await Classes.findByPk(body.class_id);

    if (data === null) {
        return res.status(403).json({ success: false, message: "You don't have any Class with class id  : " + body.class_id })
    } else {
        if (data.instructorId) {
            data.destroy();
            return res.status(200).json({ success: true, message: "Deleted successfully !!" })
        } else {
            return res.status(200).json({ success: false, message: "You can delete/manage only your classes !!" })
        }

    }

}


module.exports = {
    getClasses,
    addClasses,
    classUpdate,
    classDelete
}