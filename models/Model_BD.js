
module.exports = function(pool, mysql) {
	return {

			UploadUser: function(username, password, callback) {
					console.log('рег ' + username + ' ' + password);
					var sql = "INSERT INTO `userSide` (name, password) VALUES ('??','" + password +"');"; 
					var inserts = [username];
					sql = mysql.format(sql, inserts);
						console.log('рег ' + sql );	
						pool.query(sql, callback);					
			},
			

			findIdUser:	function(id, callback){
				var sql_user = "SELECT * FROM `userSide` WHERE `id` IN ( '??' );";
					sql_user =sql_user + mysql.escape(id);
					pool.query(sql_user,callback);			
			},			


			findNameUser: function(username, callback){
				console.log('Поиск ' + username);
				var sql_user = "SELECT * FROM `userSide` WHERE `name` IN ( '??' );";
				var inserts = [username];
					sql_user = mysql.format(sql_user, inserts);	
					console.log('Поиск ' + sql_user);	
					pool.query(sql_user,callback);
			}			
					

	}
}





   








