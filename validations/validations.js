const { Joi } = require("express-validation")


const addClassvalidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        tutor_id: Joi.number()
            .required(),

    })
}


const updateClassValidation = {
    body: Joi.object({

        class_id: Joi.number()
            .required(),
        tutor_id: Joi.number(),
        name: Joi.string()


    })
}

const deleteClassValidation = {
    body: Joi.object({

        class_id: Joi.number()
            .required(),

        student_id: Joi.number()
            .required()


    })
}

const addClassStudentValidation = {
    body: Joi.object({

        class_id: Joi.number()
            .required(),
        student_id: Joi.number()
            .required(),


    })
}

module.exports = {
    addClassvalidation,
    updateClassValidation,
    addClassStudentValidation,
    deleteClassValidation
}