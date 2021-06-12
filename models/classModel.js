module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define("classes", {

        name: {
            type: DataTypes.STRING(255),
            trim: true,
            minlength: 1
        },
        instructorId: {
            type: DataTypes.BIGINT,
            trim: true,
            minlength: 1
        },
        tutorId: {
            type: DataTypes.BIGINT,
            trim: true,
            minlength: 1
        },
        numberOfStudents: {
            type: DataTypes.BIGINT,
            trim: true,
            defaultValue: 0,
            minlength: 1
        }

    })

    return Classes;
}