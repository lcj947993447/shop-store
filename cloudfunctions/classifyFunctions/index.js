const addClassify = require('./addClassify/index');
const getClassify = require('./getClassify/index');
const delClassify = require('./delClassify/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addClassify':
      return await addClassify.main(event, context);
    case 'getClassify':
      return await getClassify.main(event, context);
    case 'delClassify':
      return await delClassify.main(event, context);
  }
};