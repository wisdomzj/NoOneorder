// 支付宝第三方sdk
const Alipay = require('alipay-mobile').default
const assert = require('assert')
const { app_id, appPrivKeyFile, alipayPubKeyFile } = require('../config')

class Pay {
  async dopay(ctx, next) {
    const options = {
      app_id, 
      appPrivKeyFile, 
      alipayPubKeyFile
    }
    const service = new Alipay(options) 
    const { order_id, total_price, return_url } = ctx.request.body
    const data = {
      subject: '无人点餐',
      out_trade_no: order_id,
      total_amount: total_price
    }
    const basicParams = {
      return_url,
      // 异步通知的地址
      notify_url: "http://localhost:3000/pay/alipayNotify",
    }

    return service.createPageOrderURL(data, basicParams)
      .then(res => {
        assert(res.code == 0, result.message)
        assert(res.message == 'success', result.message)
        ctx.body = {
          result: res
        }        
      })
  }

  async alipayNotify(ctx, next) {
    const service = new Alipay({
      app_id, 
      appPrivKeyFile, 
      alipayPubKeyFile
    })
    const { trade_status, out_trade_no } = ctx.request.body
    const result = await service.makeNotifyResponse({ ...ctx.request.body })      
    
    if(result.code === 0){
      if(trade_status === 'TRADE_SUCCESS'){
        // await  DB.update('shop_order',{"order_id":order_id},{"pay_status":1,'pay_type':2});
        // var orderResult=await  DB.find('shop_order',{"order_id":order_id});
        // await  DB.remove('peopleinfo',{"uid":orderResult[0].uid});
        console.log('success')
      }        
    }
    ctx.body = 'success'
  }
}

module.exports = new Pay()