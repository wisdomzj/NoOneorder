const masterModel = require("../model/masterModel")
const detailModel = require("../model/detailModel")
const cartModel = require("../model/cartModel")
class Order{
  // 订单_分页形式
  async findAll_Paging(ctx, next) {
    const total = await masterModel.find({}).count()
    const { page, size } = ctx.request.query
    const curpage = Number.parseInt(page, 10) || 1
    const len = Number.parseInt(size, 10) || 5
    const sum = Math.ceil(total / len)
    const list = await masterModel.find({}, {}, {
      skip: (curpage - 1) * len,
      limit: len
    }).sort({
      addTime: -1
    })

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

  // 订单_不分页形式
  async findAll_notPaging(ctx, next) {
    const list = await masterModel.find({}).sort({
      addTime: -1
    })
    ctx.body = {
      data: {
        list
      },
      code: 20000
    }
  }

  // 查询特定订单
  async findById(ctx, next) {
    const _id = ctx.request.query.id
    const result = await masterModel.findById({ _id })

    ctx.body = {
      result,
      code: 20000
    }
  }

  // 查询特定卓的订单
  async show(ctx, next) {
    const { desk_id } = ctx.request.query
    const orderInfo = await masterModel.findOne({ desk_id })
    const products = await detailModel.find({ o_id: orderInfo._id }) 
    ctx.body = {
      result:{
        orderInfo,
        products
      },
      code: 20000
    }
  }

  // 编辑订单
  async edit(ctx, next) {
    const { _id, review, ...data } = ctx.request.body
    const status = review === '审核' ? 1 : 0
    const result = await masterModel.updateOne({ _id }, { ...data, status })

    ctx.body = {
      result,
      code: 20000
    }
  }

  // 移除订单
  async remove(ctx, next) {
    const _id = ctx.request.query.id
    const result = await masterModel.remove({ _id })

    ctx.body = {
      result,
      code: 20000
    }
  }

  //  添加订单
  async add(ctx, next) {
    const { items, desk_id, pay_status, order_status, ...data } = ctx.request.body
    const products = items ? JSON.parse(items) : [] 

    // 判断当前桌有没有  未支付或或取消的订单
    const ispayRes = await masterModel.findOne({ desk_id, pay_status, order_status })
    
    if(ispayRes){
      // 继续点餐,进行合单
      await masterModel.update({ desk_id, pay_status, order_status },{
        total_num: ispayRes.total_num + data.total_num,
        total_price: ispayRes.total_price + data.total_price
      })

      // 追加订单详情
      for(let i=0; i<products.length; i++){
        await new detailModel({
          o_id: ispayRes._id,
          title: products[i].title,
          price: products[i].price,
          num: products[i].num,
          addtime: ispayRes.addtime
        }).save()
      }
    } else {
      // 添加订单
      const res = await new masterModel({ 
        desk_id, 
        ...data, 
        pay_status, 
        order_status 
      }).save()

      // 添加订单详情
      if(res._id){
        for(let i=0; i<products.length; i++){
          await new detailModel({
            o_id: res._id,
            title: products[i].title,
            price: products[i].price,
            num: products[i].num,
            addtime: data.addtime
          }).save()
        }
      }
    }

    // 下单完毕后需清空购物车
    await cartModel.remove({ desk_id })
    
    ctx.body = {
      msg: 'success',
      code: 20000
    }
  }
}

module.exports = new Order()