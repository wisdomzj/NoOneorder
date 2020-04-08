const infoModel = require("../model/infoModel")

class info{
    async show(ctx,next){
        const { desk_id } = ctx.request.query
        const result = await infoModel.findOne({ desk_id })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    async edit(ctx,next){
        const { desk_id, ...data } = ctx.request.body
        const result = await infoModel.updateOne({ desk_id },{ ...data })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    async add(ctx,next){  
        const navEntity = new infoModel({ ...ctx.request.body })
        const result = await navEntity.save()
        
        ctx.body = {
            result,
            code: 20000 
        }
    }
}

module.exports = new info()