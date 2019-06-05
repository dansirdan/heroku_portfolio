var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define("User", {
    // user_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: {
    //     args: true,
    //     msg: "User name already in use"
    //   },
    //   validate: {
    //     len: [6],
    //     not: [" "],
    //     notEmpty: true
    //   }
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }
  });

  // User.associate = (models) => {
  //   User.belongsToMany(models.Project, { through: "ProjectUser" });
  // };

  // Creating a custom method for our User model. 
  // This will check if an unhashed password entered by the 
  // user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  // User.hook("beforeCreate", function (user) {
  //   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  // });
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
