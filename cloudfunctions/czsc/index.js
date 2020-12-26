// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db =cloud.database()
const _ =db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const fileid=event.fileid;
  db.collection('user').where({
    shouchan:_.all({fileid})
  }).get({
    success:function(res){
      console.log(res)
      console.log("1")
    },
    fail:function(){
      console.log("sb")
    }
  })
}
