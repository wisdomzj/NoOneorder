const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    c_id:{type:String,ref: 'categorys'}, //分类id
    title:{type:String}, // 菜品名称
    price:{type:Number,default: 0}, // 菜品价格
    num:{type:Number,default: 0}, // 菜品数量
    description:{type:String}, // 菜品描述
    content:{type:String}, // 菜品内容
    is_best: {type:Number,default: 0}, // 主打菜   
    is_hot:{type:Number,default: 0}, // 热销菜
    is_new:{type:Number,default: 0}, // 新品菜
    img_url:{type:String}, // 菜品封面图
    product_bar_code:{type:String}, // 菜品编码
    status:{type:Number,default: 0}, // 审核状态
    addtime:{type:String} // 添加时间
})

let productModel = mongoose.model("products",productSchema,"product")

module.exports = productModel