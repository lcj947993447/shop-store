const addGoods = require('./addGoods/index');
const getGoods = require('./getGoods/index');
const editGoods = require('./editGoods/index');
const delGoods = require('./delGoods/index');
const getGoodsDetail = require('./getGoodsDetail/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addGoods':
      return await addGoods.main(event, context);
    case 'getGoods':
      return await getGoods.main(event, context);
    case 'editGoods':
      return await editGoods.main(event, context);
    case 'delGoods':
      return await delGoods.main(event, context);
    case 'getGoodsDetail':
      return await getGoodsDetail.main(event, context);
  }
};