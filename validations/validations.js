const { Joi } = require("express-validation")


const addClassvalidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        tutor_id: Joi.number()
            .required(),

    })
}


const userValidation = {
    body: Joi.object({
        first_name: Joi.string()
            .required(),
        last_name: Joi.string()
            .required(),

        email: Joi.string().email()
            .required(),
        type: Joi.string()
            .required(),

        password: Joi.allow()
            .required()



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
    deleteClassValidation,
    userValidation
}