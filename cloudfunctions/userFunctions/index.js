const addUser = require('./addUser/index');
const getUser = require('./getUser/index');
const editUser = require('./editUser/index');
const admin = require('./admin/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addUser':
      return await addUser.main(event, context);
    case 'getUser':
      return await getUser.main(event, context);
    case 'editUser':
      return await editUser.main(event, context);
    case 'admin':
      return await admin.main(event, context);
  }
};