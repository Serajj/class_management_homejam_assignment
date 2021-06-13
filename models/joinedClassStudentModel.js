module.exports = (sequelize, DataTypes) => {
    const JoinedClasses = sequelize.define("joined_classes", {

        class_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'classes', // 'fathers' refers to table name
                key: 'id', // 'id' refers to column name in fathers table
            }
        },
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'users', // 'fathers' refers to table name
                key: 'id', // 'id' refers to column name in fathers table
            }
        }

    })

    return JoinedClasses;
}