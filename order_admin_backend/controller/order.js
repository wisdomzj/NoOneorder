const orderModel = require("../model/orderModel")

class Order{
    // 分类列表_分页形式
    async findAll_Paging(ctx,next){ 
        const total = await orderModel.find({}).count()
        const { page, size } = ctx.request.query 
        const curpage = Number.parseInt(page,10) || 1
        const len = Number.parseInt(size,10) || 5
        const sum = Math.ceil(total / len)
        const list = await orderModel.find({}, {}, {
            skip: (curpage - 1) * len,
            limit: len
        }).sort({addTime: -1}) 
        
        ctx.body = {
            data: {
                total,
                curpage,
                len,
                sum,
                list
            },
            code: 20000
        }
    }

    // 分类列表_不分页形式
    async findAll_notPaging(ctx,next){
        const list = await orderModel.find({}).sort({addTime: -1})
        ctx.body = {
            data: {
                list
            },
            code: 20000
        }
    }

    // 查询特定订单
    async findById(ctx,next){
        const _id = ctx.request.query.id
        const result = await orderModel.findById({ _id })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 编辑订单
    async edit(ctx,next){ 
        const { _id, review, ...data } = ctx.request.body
        const status = review === '审核' ? 1 : 0
        const result = await orderModel.updateOne({ _id }, { ...data, status })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 移除订单
    async remove(ctx,next){
        const _id = ctx.request.query.id
        const result = await orderModel.remove({ _id })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    //  添加订单（需要vue端添加，后台不执行添加）暂且用不到
    async add(ctx,next){
        const { review, ...data } = ctx.request.body
        const status = review === '审核' ? 1 : 0  
        const navEntity = new orderModel({...data, status})
        const result = await navEntity.save()
        
        ctx.body = {
            result,
            code: 20000 
        }
    }
}

module.exports = new Order()