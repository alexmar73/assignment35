const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const productsSchema = new Schema({
    
    productName:
    {
        type:String,
        required:true
    },

    productPrice:
    {
        type:String,
        required:true
    },

    productDescription:
    {
        type:String,
        required:true
    },

    productCategory:
    {
        type:String,
        required:true
    },

    productQuantity:
    {
        type:Number,
        required:true
    },

    productBestseller:
    {
        type:Boolean,
        required:true
    },

    productPhoto:
    {
        type:String,
        
    },

    dateCreated:
    {
        type:Date,
        default:Date.now()
    },

  });

  const productsModel = mongoose.model('products', productsSchema);
  module.exports = productsModel;