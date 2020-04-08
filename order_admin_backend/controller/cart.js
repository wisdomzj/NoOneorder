const cartModel = require('../model/cartModel')

class Cart {
  // 购物车列表
  async list(ctx, next) {
    const { desk_id } = ctx.request.query
    const list = await cartModel.find({ desk_id }).sort({
      addTime: -1
    })

    ctx.body = {
      data: {
        list
      },
      code: 20000
    }
  }

  // 增加数量
  async addcount(ctx, next) {
    const { desk_id, p_id, num } = ctx.request.query
    const fdNum = parseInt(num,10)
    const numRes = cartModel.findOne({ desk_id, p_id })
    let result = {
      data:{},
      msg:'增加数量失败'
    }
    if(!(fdNum <= numRes.num)){
      result = await cartModel.updateOne({
        desk_id, p_id
      }, {
        $set:{
          num: (fdNum + 1) > 10 ? 10 : fdNum + 1   
        }
      })
    }
  
    ctx.body = {
      result,
      code: 20000
    }
  }

  // 减少数量
  async reducecount(ctx, next) {
    const { desk_id, p_id, num } = ctx.request.query
    const fdNum = parseInt(num,10)
    const numRes = cartModel.findOne({ desk_id, p_id })
    let result = {
      data:{},
      msg:'减少数量失败'
    }
    
    if(!(fdNum >= numRes.num)){
      result = await cartModel.updateOne({
        desk_id, p_id
      }, {
        $set:{
          num: (fdNum - 1) < 0 ? 0 : fdNum - 1  
        }
      })

      if(fdNum === 1){
        result = await cartModel.remove({desk_id, p_id})
      }
    }
  
    ctx.body = {
      result,
      code: 20000
    }
  }

  // 添加购物车
  async add(ctx, next) {
    try {
      const { p_id, desk_id } = ctx.request.body
      const hasData = await cartModel.find({ p_id, desk_id })
      if(hasData.length > 0){
        await cartModel.update({ p_id, desk_id },{
          $set:{
            num: hasData[0].num + 1
          }
        })
      }else{
        const cartEntity = new cartModel({ ...ctx.request.body })
        const result = await cartEntity.save()
        ctx.body = {
          result,
          code: 20000
        }
      }
    } catch (error) {
        ctx.body = {
          msg: error,
          code: -1
        }
    }
  }
}

module.exports = new Cart()