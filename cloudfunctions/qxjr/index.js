// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db =cloud.database()
const _ =db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const name=event.name;
  const price=event.price;
  const fileid=event.fileid;
  db.collection('user').where({_openid:"off9p5H3dGHTLwC3DNqa87dxsCxc"}).update({
    data:{
    goumai:_.pull({name,price,fileid}),  
  }
  })
  
}