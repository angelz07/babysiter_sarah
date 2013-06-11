
exports.action = function(data, callback, config, SARAH){
  var date = data.date;
  console.log(date);
  // Retrieve config
  config = config.modules.meteo_belge;
  if (!config.url){
    console.log("Missing config");
    return;
  }
  
  var url = config.url;
  var request = require('request');
  request({ 'uri' : url }, function (err, response, body){
  
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
      return;
    }

	var tts = scrap(body, date);
	console.log(tts);
	callback({'tts' : tts})
		 
	
	
   
  });
}

var scrap = function(body, date){

	var $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false});
	var tts = "";
	if(date == "today"){ 
		
			tts = $('#lower-content > p').eq(0).text(); 
		
	}
	
	if(date == "tomorow"){ 
		
			tts = $('#lower-content > p').eq(1).text(); 
		
	}
		
	return tts;
}

	