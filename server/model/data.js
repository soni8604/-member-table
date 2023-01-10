const mongoose = require('mongoose')

const flatDetailSchema=new mongoose.Schema(
    {
        flatNo:{type:Number,required:true},
        fName:{type:String,required:true},
        lName:{type:String,required:true},
        mobileNo:{type:Number,required:true},
    },{timestamps: true}
)

const flatModel=mongoose.model('data',flatDetailSchema)
module.exports=flatModel