const { checkAuth, validateUser, checkAdmin } = require('./utils.js');

const authWrapper = method => {
  return (callback, params) => checkAuth(params.token,
    user_id => method(callback, params, user_id),
    callback,
    callback
  );
}

const validateWrapper = method => {
  return (callback, params, user_id) => validateUser(params.user_id,
    () => method(callback, params, user_id),
    callback,
    callback
  );
}

const adminWrapper = method => {
  return (callback, params, user_id) => checkAdmin(params.user_id,
    () => method(callback, params, user_id),
    callback,
    callback
  );
}

module.exports = {
  POST: {
    '/signin': require('./methods/signin.js'),
    '/signout': authWrapper( require('./methods/signout.js') ),
    '/signup': require('./methods/signup.js'),
    '/fillData': authWrapper( require('./methods/fillData.js') ),
    '/passwordResetRequest': require('./methods/passwordResetRequest.js'),
    '/passwordReset': require('./methods/passwordReset.js'),
    '/getReferInfo': require('./methods/getReferInfo.js'),
    '/confirmEmail': require('./methods/confirmEmail.js'),

    '/getUserInfo': authWrapper( require('./methods/getUserInfo.js') )
  }
}
