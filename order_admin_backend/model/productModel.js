const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    c_id:{type:String,ref: 'cates'},
    title:{type:String},
    price:{type:Number,default: 0},
    num:{type:Number,default: 0},
    description:{type:String},
    content:{type:String},
    is_best: {type:Number,default: 0},   
    is_hot:{type:Number,default: 0},
    is_new:{type:Number,default: 0},
    img_url:{type:String},
    product_bar_code:{type:String},
    status:{type:Number,default: 0},
    addtime:{type:String}
})

let productModel = mongoose.model("products",productSchema,"product")

module.exports = productModel