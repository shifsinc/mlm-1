const { makeQuery, makeQueryAsync } = require('../../utils.js');
const { INCORRECT_QUERY, OK, USER_NOT_EXISTS } = require('../../const.js');
const { PHOTOS_PREFIX } = require('../../config.js');

const query = `SELECT
  u.user_id,
  u.user_name,
  u.user_surname,
  u.user_photo,
  u.user_rate + 0 AS user_rate,
  u.user_status + 0 AS user_status,
  u.user_tree_refer,
  u.user_refer_type,
  s.stats_yt_left,
  s.stats_yt_right
  FROM users u
  LEFT JOIN users_stats s ON u.user_id=s.user_id`;

module.exports = function(callback, params, _user_id){/*levels, user_id*/
  var levels = parseInt( params.levels ), user_id = parseInt( params.user_id );
  if( isNaN(levels) || levels < 1 || levels > 10 ) return callback( INCORRECT_QUERY );
  if( isNaN( user_id ) ) user_id = _user_id;

  makeTree(user_id, levels, callback);
}

async function makeTree(user_id, levels, callback){
  var res = await makeQueryAsync(`${query} WHERE u.user_id=?`, [ user_id ]);
  if( res.status === 'error' ) return callback(res);
  var tree = res.result[0];
  await _makeTree(tree, levels);
  callback(Object.assign({}, OK, { result: tree }));
}

async function _makeTree(node, level){
  if( level === 0 ) return;

  var res = await makeQueryAsync(`${query} WHERE u.user_tree_refer=?`, [ node.user_id ]);
  if( res.status === 'error' ) return;

  res.result.forEach(u => {
    if( u.user_refer_type === 'l' ) node._left = u;
    else node._right = u;
  });

  if( node._left ) await _makeTree(node._left, level - 1);
  if( node._right ) await _makeTree(node._right, level - 1);
}
