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

    '/getUserInfo': authWrapper( validateWrapper( require('./methods/get/getUserInfo.js') ) ),
    '/getSponsors': authWrapper( validateWrapper( require('./methods/get/getSponsors.js') ) ),
    '/getReferals': authWrapper( validateWrapper( require('./methods/get/getReferals.js') ) ),
    '/getNews': authWrapper( validateWrapper( require('./methods/get/getNews.js') ) ),
    '/getFiles': authWrapper( validateWrapper( require('./methods/get/getFiles.js') ) ),
    '/getBilling': authWrapper( validateWrapper( require('./methods/get/getBilling.js') ) ),
    '/getUserBalance': authWrapper( validateWrapper( require('./methods/get/getUserBalance.js') ) ),
    '/getTransactions': authWrapper( validateWrapper( require('./methods/get/getTransactions.js') ) ),
    '/getUserStats': authWrapper( validateWrapper( require('./methods/get/getUserStats.js') ) ),
    '/getReferalsTree': authWrapper( validateWrapper( require('./methods/get/getReferalsTree.js') ) ),
    '/getUserBonuses': authWrapper( validateWrapper( require('./methods/get/getUserBonuses.js') ) ),
    '/getRobotFiles': authWrapper( validateWrapper( require('./methods/get/getRobotFiles.js') ) ),
    '/getRobotUpdates': authWrapper( validateWrapper( require('./methods/get/getRobotUpdates.js') ) ),
    '/getUserRobotKeys': authWrapper( validateWrapper( require('./methods/get/getUserRobotKeys.js') ) ),
    '/checkUserStartWork': authWrapper( validateWrapper( require('./methods/get/checkUserStartWork.js') ) ),

    '/updateUserInfo': authWrapper( validateWrapper( require('./methods/set/updateUserInfo.js') ) ),
    '/uploadPhoto': authWrapper( validateWrapper( require('./methods/set/uploadPhoto.js') ) ),
    '/setGeneralLinkType': authWrapper( validateWrapper( require('./methods/set/setGeneralLinkType.js') ) ),
    '/addRobotKeys': authWrapper( validateWrapper( require('./methods/set/addRobotKeys.js') ) ),

    '/buyRobot': authWrapper( validateWrapper( require('./methods/money/buyRobot.js') ) ),
    '/updateBilling': authWrapper( validateWrapper( require('./methods/money/updateBilling.js') ) ),
    '/getMoneyRate': authWrapper( validateWrapper( require('./methods/money/getMoneyRate.js') ) ),
    '/addMoney': authWrapper( validateWrapper( require('./methods/money/addMoney.js') ) ),
    '/transferMoney': authWrapper( validateWrapper( require('./methods/money/transferMoney.js') ) ),
    '/getPaymentWallets': authWrapper( validateWrapper( require('./methods/money/getPaymentWallets.js') ) ),
    '/withdrawMoney': authWrapper( validateWrapper( require('./methods/money/withdrawMoney.js') ) ),

    '/admin/searchUsers': authWrapper( adminWrapper( require('./methods/admin/searchUsers.js') ) ),
    '/admin/setUserRate': authWrapper( adminWrapper( require('./methods/admin/setUserRate.js') ) ),
    '/admin/setUserStatus': authWrapper( adminWrapper( require('./methods/admin/setUserStatus.js') ) ),
    '/admin/blockUser': authWrapper( adminWrapper( require('./methods/admin/blockUser.js') ) ),
    '/admin/addNews': authWrapper( adminWrapper( require('./methods/admin/addNews.js') ) ),
    '/admin/addFile': authWrapper( adminWrapper( require('./methods/admin/addFile.js') ) ),
    '/admin/uploadFile': authWrapper( adminWrapper( require('./methods/admin/uploadFile.js') ) ),
    '/admin/deleteNews': authWrapper( adminWrapper( require('./methods/admin/deleteNews.js') ) ),
    '/admin/deleteFile': authWrapper( adminWrapper( require('./methods/admin/deleteFile.js') ) ),
    '/admin/addMoney': authWrapper( adminWrapper( require('./methods/admin/addMoney.js') ) ),
    '/admin/confirmTransaction': authWrapper( adminWrapper( require('./methods/admin/confirmTransaction.js') ) ),
    '/admin/rejectTransaction': authWrapper( adminWrapper( require('./methods/admin/rejectTransaction.js') ) ),
    '/admin/getAnalytics': authWrapper( adminWrapper( require('./methods/admin/getAnalytics.js') ) ),
    '/admin/getEvents': authWrapper( adminWrapper( require('./methods/admin/getEvents.js') ) ),
  }
}
