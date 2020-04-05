const fs = require('fs')
const tools = {
    removeFile(filename){
        return new Promise((resolve,reject)=>{
            fs.unlink(filename,(err)=>{
                if(err){
                    reject(err)
                }
                resolve({msg:'success'})
            })
        })
    }
}

module.exports = tools