const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

const PAGE_NUMBER = 10

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  return await db.collection('order').skip(event.page * PAGE_NUMBER).limit(PAGE_NUMBER).get();
};