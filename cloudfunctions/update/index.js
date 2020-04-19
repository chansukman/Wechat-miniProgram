// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"days30-jeacq"
})
const db=cloud.database()
const _=db.command
const base=db.collection("addtask")

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await base
    .where({
      _id:event._id
    })
    .update({
      data:{
       like:_.inc(1)
      },
    })
  }
  catch(e){
    console.error(e)
  }
 
}