const { makeQuery } = require('../../utils.js');
const { INCORRECT_QUERY, USER_NOT_EXISTS } = require('../../const.js');
const { PHOTOS_PREFIX } = require('../../config.js');

const query = `SELECT
  u.user_id,
  u.user_name,
  u.user_surname,
  u.user_photo,
  u.user_rate + 0 AS user_rate,
  u.user_status + 0 AS user_status,
  s.stats_yt_left,
  s.stats_yt_right
  FROM users u
  LEFT JOIN users_stats s ON u.user_id=s.user_id`;

module.exports = function(callback, params, _user_id){/*levels, user_id*/
  var levels = parseInt( params.levels ), user_id = parseInt( params.user_id );
  if( isNaN(levels) || levels < 1 || levels > 10 ) return callback( INCORRECT_QUERY );
  if( isNaN( user_id ) ) user_id = _user_id;

  var nodesCount = Math.pow( 2, levels ) - 1, tree;
  makeQuery(query + ` WHERE u.user_id=?`, [ user_id ],
    res => {
      if( !res.result.length ) return callback( USER_NOT_EXISTS );
      tree = res.result[0];
      tree.user_photo_url = PHOTOS_PREFIX + tree.user_photo;
      makeTree(tree, levels, [], [], count => {

        nodesCount -= count;
        if( nodesCount > 0 ) return;
        callback({ status: 'ok', result: tree });

      }, callback);
  }, callback);
}

function makeTree(node, level, reserveLeft, reserveRight, callback, onError){
  if( node === null ) return callback( Math.pow( 2, level ) - 1 );
  callback(1);
  if( level === 1 ) return;

  makeQuery(query + ` WHERE u.user_refer=? AND u.user_refer_type="l" ORDER BY u.user_dt LIMIT ?`,
    [ node.user_id, level - 1 ],
    res => {
      var left = res.result.shift();
      node._left = left ? left : ( reserveLeft.length ? reserveLeft.shift() : null );
      var res = Array.of( ...res.result ).concat( reserveLeft );

      if(node._left) node._left.user_photo_url = PHOTOS_PREFIX + node._left.user_photo;

      makeTree( node._left, level - 1, res, [], callback, onError );
    }, onError);

  makeQuery(query + ` WHERE u.user_refer=? AND u.user_refer_type="r"  ORDER BY u.user_dt LIMIT ?`,
    [ node.user_id, level - 1 ],
    res => {
      var right = res.result.shift();
      node._right = right ? right : ( reserveRight.length ? reserveRight.shift() : null );
      var res = Array.of( ...res.result ).concat( reserveRight );

      if(node._right) node._right.user_photo_url = PHOTOS_PREFIX + node._right.user_photo;

      makeTree( node._right, level - 1, [], res, callback, onError );
    }, onError);
}
