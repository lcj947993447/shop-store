const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  const {classify, image, name, price} = event
  return await db.collection('goods').add({
    // data 传入需要局部更新的数据
    data: {
      classify, image, name, price
    }
  });
};