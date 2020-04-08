const mongoose = require('mongoose')

let infoSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    desk_id:{type:String}, // 桌号
    number:{type:Number}, // 人数
    mark:{type:String}, // 备注  
})

let infoModel = mongoose.model("infos",infoSchema,"info")

module.exports = infoModel 
