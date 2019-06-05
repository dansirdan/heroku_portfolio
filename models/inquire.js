module.exports = function (sequelize, DataTypes) {

  var Note = sequelize.define("Note", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "User name already in use"
      },
      validate: {
        len: [6],
        not: [" "],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        isEmail: true,
        notEmpty: true
      }
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Note;
};
