const addOrder = require('./addOrder/index');
const getOrder = require('./getOrder/index');
const editOrder = require('./editOrder/index');
const delOrder = require('./delOrder/index');
const getOrderDetail = require('./getOrderDetail/index');

const ORDER_STATUS = {
  WAIT_PAY: '待付款',
  WAIT_DELIVERY: '待发货',
  WAIT_EXAMINE: '待审核',
  WAIT_RECEIVE: '待收货',
  COMPLETED: '已完成',
}

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addOrder':
      return await addOrder.main(event, context);
    case 'getOrder':
      return await getOrder.main(event, context);
    case 'editOrder':
      return await editOrder.main(event, context);
    case 'delOrder':
      return await delOrder.main(event, context);
    case 'getOrderDetail':
      return await getOrderDetail.main(event, context);
  }
};