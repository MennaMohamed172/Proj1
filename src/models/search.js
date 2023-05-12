const mongoose=require("mongoose");
// const validator = require ('validator')
// const bcryptjs = require ('bcryptjs')


// Define product schema and model
const productSchema = new mongoose.Schema({
    Category:{
      type:String,
      trim:true
    },
    DrugName:{
      type:String,
      required:true,
      trim:true,
      unique:true
    },
    Indications:{
      type:String,
      trim:true
    },
    Form:{
    type:String,
    required:true,
    trim:true,
    maxlenght:30
    },
    CompanyName:{
      type:String
    },
    EffectiveMaterial:{
      type:String,
      required:true
    },
    HowToUse:{
      type:String,
      required:true
    },
    PregnantAndLactating:{
      type:String,
      required:true
    },
    Dose:{
      type:String,
      required:true
    },
    Alternatives:{
      type:String,
      required:true
    },
    Scheduled:{
      required:true,
      type:Boolean
    }
  
  });
  // 
  const Product = mongoose.model('Product', productSchema);

  module.exports =Product
