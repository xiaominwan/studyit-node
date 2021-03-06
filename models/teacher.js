
var db = require('../config/db');

var md5 = require('md5');

// 添加讲师
exports.add = function (body, cb) {
	// md5处理
	body['tc_pass'] = md5(body['tc_pass']);

	db.query('INSERT INTO `teacher` SET ?', body, function (err, result) {
		if(err) return cb(err);

		cb(err, result);

	});
}

exports.find = function (tc_id, cb) {
	var query = 'SELECT * FROM `teacher` WHERE `tc_id` = ?';

	db.query(query, [tc_id], cb);
}

exports.show = function (cb) {
	var query = 'SELECT * FROM `teacher` WHERE `tc_type` != 0';

	db.query(query, cb);
}

exports.update = function (body, cb) {
	var query = 'UPDATE `teacher` SET ? WHERE `tc_id` = ?';

	var tc_id = body.tc_id;

	delete body.tc_id;

	db.query(query, [body, tc_id], cb);
}

exports.repass = function (body, cb) {
	var tc_pass = md5(body.tc_pass);
	var tc_newpass = md5(body.tc_newpass);
	var tc_id = body.tc_id;

	var query = 'UPDATE `teacher` SET `tc_pass` = ? WHERE `tc_id` = ? AND `tc_pass` = ?';

	db.query(query, [tc_newpass, tc_id, tc_pass], cb);
}







