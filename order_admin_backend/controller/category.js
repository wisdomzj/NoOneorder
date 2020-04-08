const categoryModel = require("../model/categoryModel")

class Category{
    // 分类列表_分页形式
    async findAll_Paging(ctx,next){ 
        const total = await categoryModel.find({}).count()
        const { page, size } = ctx.request.query 
        const curpage = Number.parseInt(page,10) || 1
        const len = Number.parseInt(size,10) || 5
        const sum = Math.ceil(total / len)
        const list = await categoryModel.find({}, {}, {
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
        const list = await categoryModel.find({}).sort({ addTime: -1 })
        ctx.body = {
            data: {
                list
            },
            code: 20000
        }
    }

    // 查询每个分类下所有菜品
    async findcategory_allproduct(ctx,next){
        const result = await categoryModel.aggregate([
            { "$addFields": { "_id": { "$toString": "$_id" }}},
            { "$lookup": {
                "from": "product",
                "localField": "_id",
                "foreignField": "c_id",
                "as": "list"
            }}
        ])

        ctx.body = {
            result,
            code: 20000
        }
    }

    // 查询特定分类
    async findById(ctx,next){
        const _id = ctx.request.query.id
        const result = await categoryModel.findById({ _id })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 编辑分类
    async edit(ctx,next){ 
        const { _id, review, ...data } = ctx.request.body
        const status = review === '审核' ? 1 : 0
        const result = await categoryModel.updateOne({ _id }, { ...data, status })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 移除分类
    async remove(ctx,next){
        const _id = ctx.request.query.id
        const result = await categoryModel.remove({ _id })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 添加分类
    async add(ctx,next){
        const { review, ...data } = ctx.request.body
        const status = review === '审核' ? 1 : 0  
        const categoryEntity = new categoryModel({ ...data, status })
        const result = await categoryEntity.save()
        
        ctx.body = {
            result,
            code: 20000 
        }
    }
}

module.exports = new Category()