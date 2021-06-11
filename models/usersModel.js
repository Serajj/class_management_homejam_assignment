module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,

        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        type: DataTypes.STRING,
        roleId: DataTypes.INTEGER
    })

    return Users;
}