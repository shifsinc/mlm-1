const { checkAuth } = require('./utils.js');

var authWrapper = method => {
  return (callback, params) => checkAuth(params.token,
    (user_id, role_id) => method(callback, { ...params, user_id, role_id }),
    err => callback(err)
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
    '/getReferInfo': require('./methods/getReferInfo.js')
  }
}
