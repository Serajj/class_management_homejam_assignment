const { Joi } = require("express-validation")


const addClassvalidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        tutorId: Joi.number()
            .required(),

    })
}


const updateClassValidation = {
    body: Joi.object({

        class_id: Joi.number()
            .required(),
        tutorId: Joi.number(),
        name: Joi.string()


    })
}


module.exports = {
    addClassvalidation,
    updateClassValidation
}