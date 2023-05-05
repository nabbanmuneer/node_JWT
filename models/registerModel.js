const mongoose = require("mongoose");
const validator=require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const registerSchema = new Schema(
    {
        email:{
            type:String,
            require:true,
            unique:true
        },
        name:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true,
            unique:true   
        },
        createdAt:{type:Date,default:Date.now,index:{expires:300}},
        
    }
)
registerSchema.plugin(validator);
module.exports=mongoose.model('registerModel',registerSchema)