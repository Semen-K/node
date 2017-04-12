module.exports = function(){
	return {
		returnFormLogin: function(req, res){
			
		},

		returnFormRegistreit: function(req, res){

		},

		returnFormPasswordRecovery: function(req, res){

		}, 

		returnPagePrimary: function(req, res){
			res.render('primary', {	masseg: 'Здараствуйте!!! Вас приветствует Екатерина Туля!!!'});
		},

		returnPageRecording: function(req, res){

		},

		returnPageGallery: function(req, res) {

		},

		returnPagePrice: function(req, res) {

		},
	}
}