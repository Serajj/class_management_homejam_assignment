module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,

        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        type: DataTypes.STRING,
        roleid: DataTypes.INTEGER
    })

    return Users;
}