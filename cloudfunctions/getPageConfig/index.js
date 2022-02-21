const getBanner = require('./getBanner/index');

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getBanner':
      return await getBanner.main(event, context);
  }
};
