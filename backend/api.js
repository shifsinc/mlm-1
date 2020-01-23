const { checkAuth, validateUser, checkAdmin } = require('./utils.js');
const { API_PREFIX } = require('./config.js');

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
    [ API_PREFIX + '/signin' ]: require('./methods/login/signin.js'),
    [ API_PREFIX + '/signout' ]: authWrapper( require('./methods/login/signout.js') ),
    [ API_PREFIX + '/signup' ]: require('./methods/login/signup.js'),
    [ API_PREFIX + '/passwordResetRequest' ]: require('./methods/login/passwordResetRequest.js'),
    [ API_PREFIX + '/passwordReset' ]: require('./methods/login/passwordReset.js'),
    [ API_PREFIX + '/confirmEmail' ]: require('./methods/login/confirmEmail.js'),
    [ API_PREFIX + '/getReferInfo' ]: require('./methods/login/getReferInfo.js'),
    [ API_PREFIX + '/fillUserInfo' ]: authWrapper( require('./methods/login/fillUserInfo.js') ),

    [ API_PREFIX + '/getUserInfo' ]: authWrapper( require('./methods/get/getUserInfo.js') ),
    [ API_PREFIX + '/getSponsors' ]: authWrapper( validateWrapper( require('./methods/get/getSponsors.js') ) ),
    [ API_PREFIX + '/getReferals' ]: authWrapper( validateWrapper( require('./methods/get/getReferals.js') ) ),
    [ API_PREFIX + '/getNews' ]: authWrapper( validateWrapper( require('./methods/get/getNews.js') ) ),
    [ API_PREFIX + '/getFiles' ]: authWrapper( validateWrapper( require('./methods/get/getFiles.js') ) ),
    [ API_PREFIX + '/getBilling' ]: authWrapper( validateWrapper( require('./methods/get/getBilling.js') ) ),
    [ API_PREFIX + '/getUserBalance' ]: authWrapper( validateWrapper( require('./methods/get/getUserBalance.js') ) ),
    [ API_PREFIX + '/getTransactions' ]: authWrapper( validateWrapper( require('./methods/get/getTransactions.js') ) ),
    [ API_PREFIX + '/getUserStats' ]: authWrapper( validateWrapper( require('./methods/get/getUserStats.js') ) ),
    [ API_PREFIX + '/getReferalsTree' ]: authWrapper( validateWrapper( require('./methods/get/getReferalsTree.js') ) ),
    [ API_PREFIX + '/getUserBonuses' ]: authWrapper( validateWrapper( require('./methods/get/getUserBonuses.js') ) ),
    [ API_PREFIX + '/getUserRobotKeys' ]: authWrapper( validateWrapper( require('./methods/get/getUserRobotKeys.js') ) ),
    [ API_PREFIX + '/checkUserStartWork' ]: authWrapper( validateWrapper( require('./methods/get/checkUserStartWork.js') ) ),

    [ API_PREFIX + '/updateUserInfo' ]: authWrapper( validateWrapper( require('./methods/set/updateUserInfo.js') ) ),
    [ API_PREFIX + '/uploadPhoto' ]: authWrapper( require('./methods/set/uploadPhoto.js') ),
    [ API_PREFIX + '/setGeneralLinkType' ]: authWrapper( validateWrapper( require('./methods/set/setGeneralLinkType.js') ) ),
    [ API_PREFIX + '/addRobotKeys' ]: authWrapper( validateWrapper( require('./methods/set/addRobotKeys.js') ) ),
    [ API_PREFIX + '/extendRobot' ]: authWrapper( validateWrapper( require('./methods/set/extendRobot.js') ) ),

    [ API_PREFIX + '/buyRobot' ]: authWrapper( validateWrapper( require('./methods/money/buyRobot.js') ) ),
    [ API_PREFIX + '/updateBilling' ]: authWrapper( validateWrapper( require('./methods/money/updateBilling.js') ) ),
    [ API_PREFIX + '/fillBilling' ]: authWrapper( validateWrapper( require('./methods/money/fillBilling.js') ) ),
    [ API_PREFIX + '/getMoneyRate' ]: authWrapper( validateWrapper( require('./methods/money/getMoneyRate.js') ) ),
    [ API_PREFIX + '/addMoney' ]: authWrapper( validateWrapper( require('./methods/money/addMoney.js') ) ),
    [ API_PREFIX + '/transferMoney' ]: authWrapper( validateWrapper( require('./methods/money/transferMoney.js') ) ),
    [ API_PREFIX + '/getPaymentWallets' ]: authWrapper( validateWrapper( require('./methods/money/getPaymentWallets.js') ) ),
    [ API_PREFIX + '/withdrawMoney' ]: authWrapper( validateWrapper( require('./methods/money/withdrawMoney.js') ) ),

    [ API_PREFIX + '/admin/searchUsers' ]: authWrapper( adminWrapper( require('./methods/admin/searchUsers.js') ) ),
    [ API_PREFIX + '/admin/sortUsers' ]: authWrapper( adminWrapper( require('./methods/admin/sortUsers.js') ) ),
    [ API_PREFIX + '/admin/setUserRate' ]: authWrapper( adminWrapper( require('./methods/admin/setUserRate.js') ) ),
    [ API_PREFIX + '/admin/setUserStatus' ]: authWrapper( adminWrapper( require('./methods/admin/setUserStatus.js') ) ),
    [ API_PREFIX + '/admin/blockUser' ]: authWrapper( adminWrapper( require('./methods/admin/blockUser.js') ) ),
    [ API_PREFIX + '/admin/addNews' ]: authWrapper( adminWrapper( require('./methods/admin/addNews.js') ) ),
    [ API_PREFIX + '/admin/addFile' ]: authWrapper( adminWrapper( require('./methods/admin/addFile.js') ) ),
    [ API_PREFIX + '/admin/uploadFile' ]: authWrapper( adminWrapper( require('./methods/admin/uploadFile.js') ) ),
    [ API_PREFIX + '/admin/deleteNews' ]: authWrapper( adminWrapper( require('./methods/admin/deleteNews.js') ) ),
    [ API_PREFIX + '/admin/deleteFile' ]: authWrapper( adminWrapper( require('./methods/admin/deleteFile.js') ) ),
    [ API_PREFIX + '/admin/addMoney' ]: authWrapper( adminWrapper( require('./methods/admin/addMoney.js') ) ),
    [ API_PREFIX + '/admin/confirmTransaction' ]: authWrapper( adminWrapper( require('./methods/admin/confirmTransaction.js') ) ),
    [ API_PREFIX + '/admin/rejectTransaction' ]: authWrapper( adminWrapper( require('./methods/admin/rejectTransaction.js') ) ),
    [ API_PREFIX + '/admin/getAnalytics' ]: authWrapper( adminWrapper( require('./methods/admin/getAnalytics.js') ) ),
    [ API_PREFIX + '/admin/getEvents' ]: authWrapper( adminWrapper( require('./methods/admin/getEvents.js') ) ),
    [ API_PREFIX + '/admin/getNews' ]: authWrapper( adminWrapper( require('./methods/admin/getNews.js') ) ),
    [ API_PREFIX + '/admin/getFiles' ]: authWrapper( adminWrapper( require('./methods/admin/getFiles.js') ) ),

    /*[ API_PREFIX + '/admin/acceptPaymentPP' ]: require('./methods/money/acceptPaymentPP.js'),*/
  }
}
