const mongoose = require('mongoose')

let masterSchema = mongoose.Schema({
    __v: { type: Number, select: false },
    desk_id:{type:String}, // 桌号
    number:{type:Number}, // 总人数
    mark:{type:String}, // 备注信息
    total_price:{type:Number}, // 总价格
    total_num:{type:Number}, // 总数量
    addtime:{type:Date}, // 下单时间
    updatetime:{type:Date}, // 修改订单时间
    pay_status:{type:Number, default: 0}, // 支付状态
    order_status:{type:Number, default: 0} // 订单状态  
})

let masterModel = mongoose.model("masters",masterSchema,"master")

module.exports = masterModel