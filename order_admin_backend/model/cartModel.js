const mongoose = require('mongoose')

let cartSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    desk_id:{type:String},
    title:{type:String},
    p_id:{type:String},
    img_url:{type:String},
    price:{type:Number},
    num:{type:Number}
})

let cartModel = mongoose.model('carts',cartSchema,'cart')

module.exports = cartModel