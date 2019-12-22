const { makeQuery } = require('../utils.js');
const { INCORRECT_QUERY } = require('../const.js');
const { PHOTOS_PREFIX } = require('../config.js');

const query = `SELECT
  u.user_id,
  u.user_name,
  u.user_surname,
  u.user_photo,
  u.user_rate,
  s.yt_left,
  s.yt_right
  FROM users u
  LEFT JOIN stats s ON u.user_id=s.user_id`;

module.exports = function(callback, params, _user_id){/*levels, user_id*/
  var levels = params.levels, user_id = params.user_id;
  if( user_id === undefined ) user_id = _user_id;
  if( isNaN(levels) || levels < 1 || levels > 10 || isNaN(user_id) ) return callback( INCORRECT_QUERY );

  var nodesCount = Math.pow( 2, levels ) - 1, tree;
  makeQuery(query + ` WHERE u.user_id=?`, [ user_id ],
    res => {
      tree = res.result[0];
      tree.user_photo_url = PHOTOS_PREFIX + tree.user_photo;
      makeTree(tree, levels, count => {

        nodesCount -= count;
        if( nodesCount > 0 ) return;
        callback({ status: 'ok', result: tree });

      }, callback);
  }, callback);
}

function makeTree(node, level, callback, onError){
  if( node === null ) return callback( Math.pow( 2, level ) - 1 );
  callback(1);
  if( level === 1 ) return;

  makeQuery(query + ` WHERE u.user_refer=? AND u.user_refer_type="l" ORDER BY u.user_dt LIMIT 1`,
    [ node.user_id ],
    res => {

      node._left = res.result.length ? res.result[0] : null;
      if(node._left) node._left.user_photo_url = PHOTOS_PREFIX + node._left.user_photo;

      makeTree( node._left, level - 1, callback, onError );
    }, onError);

  makeQuery(query + ` WHERE u.user_refer=? AND u.user_refer_type="r"  ORDER BY u.user_dt LIMIT 1`,
    [ node.user_id ],
    res => {
      node._right = res.result.length ? res.result[0] : null;
      if(node._right) node._right.user_photo_url = PHOTOS_PREFIX + node._right.user_photo;

      makeTree( node._right, level - 1, callback, onError );
    }, onError);
}
