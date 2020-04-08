const detailModel = require("../model/detailModel")

class Detail{
    // 订单详情列表_分页形式
    async findAll_Paging(ctx,next){ 
        const total = await detailModel.find({}).count()
        const { page, size, o_id, addtime } = ctx.request.body 
        const curpage = Number.parseInt(page,10) || 1
        const len = Number.parseInt(size,10) || 5
        const sum = Math.ceil(total / len)
        const list = await detailModel.find({o_id, addtime}, {}, {
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

    // 订单详情列表_不分页形式
    async findAll_notPaging(ctx,next){
        const list = await detailModel.find({}).sort({addTime: -1})
        ctx.body = {
            data: {
                list
            },
            code: 20000
        }
    }
}

module.exports = new Detail()