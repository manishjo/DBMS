var bookcatalog = require('./lib_bookcatalog').bookcatalog;
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'manish',
  password : 'password',
  database : 'test'
});
connection.connect();
var bookcatalog = require('./lib_bookcatalog').bookcatalog;
var main=function(input){
	var args=process.argv.slice(2,process.argv.length);
	var showToUser=bookcatalog.getUserInput(args,connection);
	return showToUser.message;
};
console.log(main());
connection.end();
