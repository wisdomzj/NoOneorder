const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
    __v: { type: Number, select: false },
    title:{type:String}, // 分类名称
    description:{type:String}, // 分类描述
    keywords:{type:String}, // 分类关键字
    addtime:{type:Date}, // 添加时间
    status:{type:Number} // 审核状态  
})

let categoryModel = mongoose.model("categorys",categorySchema,"category")

module.exports = categoryModel 
