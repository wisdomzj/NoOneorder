const mongoose = require('mongoose')

let cartSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    desk_id:{type:String}, // 桌号
    title:{type:String}, // 菜品名称
    p_id:{type:String}, // 菜品id
    img_url:{type:String}, // 菜品封面图
    price:{type:Number}, // 菜品价格
    num:{type:Number} // 菜品数量
})

let cartModel = mongoose.model('carts',cartSchema,'cart')

module.exports = cartModel