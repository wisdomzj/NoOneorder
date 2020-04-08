const productModel = require("../model/productModel")
const path = require('path')
const tools = require('../utils/Tools')

class Product {
    // 菜品列表
    async findAll(ctx,next){
        const total = await productModel.find({}).count()
        const { page, size } = ctx.request.query 
        const curpage = Number.parseInt(page) || 1
        const len = Number.parseInt(size) || 5
        const sum = Math.ceil(total / len)
        const list = await productModel.find({}, {}, {
            skip: (curpage - 1) * len,
            limit: len
        }).sort({
            addtime: -1
        }).populate('c_id')
        
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

    // 查询特定菜品 get传参
    async findById(ctx,next){
        const _id = ctx.request.query.id
        const result = await productModel.findById({ _id }).populate('c_id')
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 查询特定菜品 动态路由
    async showProduct(ctx,next){
        const _id = ctx.params.id
        const result = await productModel.findById({ _id })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 移除菜品
    async remove(ctx,next){
        const { _id, imgUrl } = ctx.request.body
        const pciUrl = imgUrl.substr(ctx.origin.length, imgUrl.length)
        const oripath = path.join(__dirname,'../')
        const filepath = `${oripath}public${pciUrl}`
        const delfileRes = await tools.removeFile(filepath)
        const result = await productModel.remove({ _id })
        
        ctx.body = {
            data: {
                result,
                msg: delfileRes.msg 
            },
            code: 20000
        }
    }

    // 编辑菜品
    async edit(ctx,next){ 
        console.log(ctx.request.body)
        const { _id, type, review, coverPicture, ...data } = ctx.request.body
        const recommend = {
            is_best: type.indexOf('精品')>-1 ? 1 : 0,
            is_hot: type.indexOf('热品')>-1 ? 1 : 0,
            is_new: type.indexOf('新品')>-1 ? 1 : 0,
            status: review === '审核' ? 1 : 0      
        }    
        if(data.img_url){
            const imgUrl = coverPicture.substr(ctx.origin.length,coverPicture.length)
            const oripath = path.join(__dirname,'../')
            const filepath = `${oripath}public${imgUrl}`
            await tools.removeFile(filepath)
        } else {
            data.img_url = coverPicture 
        } 
        const result = await productModel.updateOne({ _id }, { ...data, ...recommend })
        
        ctx.body = {
            result,
            code: 20000
        }
    }

    // 添加菜品
    async add(ctx,next){
        const { type, review, ...data } = ctx.request.body
        const recommend = {
            is_best: type.indexOf('精品')>-1 ? 1 : 0,
            is_hot: type.indexOf('热品')>-1 ? 1 : 0,
            is_new: type.indexOf('新品')>-1 ? 1 : 0,
            status: review === '审核' ? 1 : 0      
        }    
        const productEntity = new productModel({ ...data, ...recommend })
        const result = await productEntity.save()
        
        ctx.body = {
            result,
            code: 20000 
        }
    }
}

module.exports = new Product()