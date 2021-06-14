'use strict';

// load sequelize module
const { Model, DataTypes } = require('sequelize');

// Define Model for the Users table, with four attributes set to the correct data type,
// and validation to ensure that the values for firstName, lastName, emailAddress, and password are properly submitted in the request body

module.exports = (sequelize) => {
  class Users extends Model {}
  Users.init({
      
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "firstName"'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "lastName"'
        },
        notEmpty: {
          msg: 'Please provide a last name'
        }
      }
    },

// Validation is added to the emailAddress attribute to ensure that the provided email address is properly formatted,
// and a unique constraint is added to to ensure that the provided email address isn't already associated with an existing user

    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email you entered already exists' 
      },
      validate: {
        notNull: {
          msg: 'Please provide a value for "emailAddress"'
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        },
        notEmpty: {
          msg: 'Please provide an email address'
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "password"'
        },
        notEmpty: {
          msg: 'Please provide a password'
        }
      }
    },
   
  }, { sequelize });

// Define one-to-many association between the User and Course models

  Users.associate = (models) => {
    Users.hasMany(models.Courses, {

      // userId created in the model associations with the foreignKey property, equals the id from the Users table
      foreignKey: 'userId'
      
    });
  };

  return Users;
};