const mongoose = require('mongoose')

let detailSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    o_id:{type:String}, // 订单编号
    title:{type:String}, // 菜品名称
    price:{type:Number}, // 菜品价格
    num:{type:Number, default: 0}, //菜品数量
    status:{type:Number, default: 0} // 下菜品单状态  
})

let detailModel = mongoose.model("details",detailSchema,"detail")

module.exports = detailModel