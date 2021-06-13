module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define("classes", {

        name: {
            type: DataTypes.STRING(255),
            trim: true,
            minlength: 1
        },
        instructor_id: {
            type: DataTypes.BIGINT,
            trim: true,
            minlength: 1
        },
        tutor_id: {
            type: DataTypes.BIGINT,
            trim: true,
            minlength: 1
        },
        number_of_students: {
            type: DataTypes.BIGINT,
            trim: true,
            defaultValue: 0,
            minlength: 1
        }

    })

    return Classes;
}