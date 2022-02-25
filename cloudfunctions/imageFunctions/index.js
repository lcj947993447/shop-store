const getImage = require('./getImage/index');
const delImage = require('./getImage/index');
const addImage = require('./getImage/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getImage':
      return await getImage.main(event, context);
    case 'delImage':
      return await delImage.main(event, context);
    case 'addImage':
      return await addImage.main(event, context);
  }
};