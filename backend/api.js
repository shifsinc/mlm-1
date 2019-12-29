const { checkAuth, validateUser, checkAdmin } = require('./utils.js');

const authWrapper = method => {
  return (callback, params) => checkAuth(params.token,
    user_id => method(callback, params, user_id),
    callback,
    callback
  );
}

const validateWrapper = method => {
  return (callback, params, user_id) => validateUser(user_id,
    () => method(callback, params, user_id),
    callback,
    callback
  );
}

const adminWrapper = method => {
  return (callback, params, user_id) => checkAdmin(user_id,
    () => method(callback, params, user_id),
    callback,
    callback
  );
}

module.exports = {
  POST: {
    '/signin': require('./methods/login/signin.js'),
    '/signout': authWrapper( require('./methods/login/signout.js') ),
    '/signup': require('./methods/login/signup.js'),
    '/passwordResetRequest': require('./methods/login/passwordResetRequest.js'),
    '/passwordReset': require('./methods/login/passwordReset.js'),
    '/confirmEmail': require('./methods/login/confirmEmail.js'),
    '/getReferInfo': require('./methods/login/getReferInfo.js'),
    '/fillUserInfo': authWrapper( require('./methods/login/fillUserInfo.js') ),

    '/getUserInfo': authWrapper( require('./methods/get/getUserInfo.js') ),
    '/getSponsors': authWrapper( require('./methods/get/getSponsors.js') ),
    '/getReferals': authWrapper( require('./methods/get/getReferals.js') ),
    '/getNews': authWrapper( require('./methods/get/getNews.js') ),
    '/getFiles': authWrapper( require('./methods/get/getFiles.js') ),
    '/getBilling': authWrapper( require('./methods/get/getBilling.js') ),
    '/getUserBalance': authWrapper( require('./methods/get/getUserBalance.js') ),
    '/getTransactions': authWrapper( require('./methods/get/getTransactions.js') ),
    '/getUserStats': authWrapper( require('./methods/get/getUserStats.js') ),
    '/getReferalsTree': authWrapper( require('./methods/get/getReferalsTree.js') ),
    '/getUserBonuses': authWrapper( require('./methods/get/getUserBonuses.js') ),
    '/getRobotFiles': authWrapper( require('./methods/get/getRobotFiles.js') ),
    '/getRobotUpdates': authWrapper( require('./methods/get/getRobotUpdates.js') ),
    '/getUserRobotKeys': authWrapper( require('./methods/get/getUserRobotKeys.js') ),
    '/checkUserStartWork': authWrapper( require('./methods/get/checkUserStartWork.js') ),

    '/updateUserInfo': authWrapper( require('./methods/set/updateUserInfo.js') ),
    '/uploadPhoto': authWrapper( require('./methods/set/uploadPhoto.js') ),
    '/setGeneralLinkType': authWrapper( require('./methods/set/setGeneralLinkType.js') ),
    '/setUserStartWork': authWrapper( require('./methods/set/setUserStartWork.js') ),
    '/addRobotKeys': authWrapper( require('./methods/set/addRobotKeys.js') ),

    '/buyRobot': authWrapper( require('./methods/money/buyRobot.js') ),
    '/updateBilling': authWrapper( require('./methods/money/updateBilling.js') ),
    '/getMoneyRate': authWrapper( require('./methods/money/getMoneyRate.js') ),
    '/addMoney': authWrapper( require('./methods/money/addMoney.js') ),
    '/transferMoney': authWrapper( require('./methods/money/transferMoney.js') ),
    '/getPaymentWallets': authWrapper( require('./methods/money/getPaymentWallets.js') ),
    '/withdrawMoney': authWrapper( require('./methods/money/withdrawMoney.js') )
  }
}
