const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const bcrypt = require("bcryptjs");

  const usersSchema = new Schema({
    firstName:
    {
        type:String,
        required:true
    },

    lastName:
    {
        type:String,
        required:true
    },

    email:
    {
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    },
    role:
    {
        type:String,
        required:true
        
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
  });

  usersSchema.pre("save", function(next)
  {
    console.log(`${this.email}`);
      bcrypt.genSalt(12)
      .then((salt)=>{
          bcrypt.hash(this.password, salt)
          .then((encryptPassword)=>{
              this.password = encryptPassword;
              next();
          })
          .catch(err=>console.log(`Hash error ${err}`));
      })
      .catch(err=>console.log(`Salt error ${err}`));
  })

  const userModel = mongoose.model('user', usersSchema);

  module.exports = userModel;