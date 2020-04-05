const mongoose = require('mongoose')

let cateSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    title:{type:String},
    description:{type:String},
    keywords:{type:String},
    addtime:{type:Date},
    status:{type:Number}  
})

let cateModel = mongoose.model("cates",cateSchema,"cate")

module.exports = cateModel 
