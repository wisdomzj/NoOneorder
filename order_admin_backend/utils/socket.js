const IO = require('koa-socket')
const io = new IO()
const url = require('url')

const socketIo = {
  init(app){
    io.attach(app);
    app._io.on('connection', (socket)=>{
      console.log('连接成功')
      const reqUrl = socket.request.url
      const deskid = url.parse(reqUrl,true).query.deskid
      socket.join(deskid)
      socket.on('addcart',(data)=>{
        socket.broadcast.to(deskid).emit('addcart','addcart') //通知分组内的用户不包括自己
      })
    })
  }
}

module.exports = socketIo 

