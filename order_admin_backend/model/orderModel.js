const mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    desk_id:{type:String},
    number:{type:String},
    note:{type:String},
    addtime:{type:Date},
    status:{type:Number}  
})

let orderModel = mongoose.model("orders",orderSchema,"order")

module.exports = orderModel 
