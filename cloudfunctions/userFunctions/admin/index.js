const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  const openId = event.openId
  await db.collection('admin').where({
    openId
  }).get().then(async res => {
    return await res.data.length > 0
  });
};