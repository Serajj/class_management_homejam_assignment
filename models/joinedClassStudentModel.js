module.exports = (sequelize, DataTypes) => {
    const JoinedClasses = sequelize.define("joined_classes", {

        classId: {
            type: DataTypes.BIGINT,
            trim: true,
            minlength: 1
        },
        userId: {
            type: DataTypes.BIGINT,
            trim: true,
            minlength: 1
        }

    })

    return JoinedClasses;
}