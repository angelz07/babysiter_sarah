var volume_demandee ="";
exports.action = function(data, callback, config, SARAH){

  // Retrieve config
  config = config.modules.xbmc;
  if (!config.api_url){
    return callback({ 'tts' : 'Configuration XBMC invalide' });
  }
  
  if (data.action == 'introspect'){
    doAction(xml, config, callback);
  }
  else if (data.action == 'xml_artist'){
    doXML(xml_artist, config, callback);
  }  
  else if (data.action == 'xml_genre'){
    doXML(xml_genre, config, callback);
  }  
  else if (data.action == 'playlist'){
    var filter = {"and":[]};
    if (data.genre) { filter.and.push({"field": "genre",  "operator": "contains", "value": data.genre  }); }
    if (data.artist){ filter.and.push({"field": "artist", "operator": "contains", "value": data.artist }); }
    if (data.title) { filter.and.push({"field": "title",  "operator": "contains", "value": data.title  }); }
    
    if (data.dictation){
      var regexp = /jarvis\srecherche\s(\w+)/gi 
      var match  = regexp.exec(data.dictation);
      if (match){
        filter = {"or":[]};
        filter.or.push({"field": "title",   "operator": "contains", "value": match[1] });
        filter.or.push({"field": "artist",  "operator": "contains", "value": match[1] });
      }
    }
    doPlaylist(filter, config, callback);
  }
   else if (data.action == 'artist'){
    var filter = {"and":[]};
    if (data.artist){ filter.and.push({"field": "artist", "operator": "contains", "value": data.artist }); }
    doPlaylist(filter, config, callback);
	
  } else if (data.action == 'play'){
    doAction(play, config, callback);
  }
  else if (data.action == 'next'){
    doAction(next, config, callback);
  }
  else if (data.action == 'prev'){
    doAction(prev, config, callback);
  }
  else if (data.action == 'volume'){
	if(data.volume_num != ""){
		volume_demandee = parseInt(data.volume_num);
		// Volume
		var volume = {"jsonrpc": "2.0", "method": "Application.SetVolume",  "params": {"volume": volume_demandee }, "id": 1}
		doAction(volume, config, callback);
	}
  }
  else if (data.action == 'fleche_up'){
    doAction(fleche_up, config, callback);
  }
  else if (data.action == 'fleche_down'){
    doAction(fleche_down, config, callback);
  }
  else if (data.action == 'fleche_left'){
    doAction(fleche_left, config, callback);
  }
  else if (data.action == 'fleche_right'){
    doAction(fleche_right, config, callback);
  }
  else if (data.action == 'bouton_select'){
    doAction(bouton_select, config, callback);
  }
  else if (data.action == 'retour_arriere'){
    doAction(retour_arriere, config, callback);
  }
  else if (data.action == 'acceuil'){
    doAction(acceuil, config, callback);
  }
  else if (data.action == 'lecture_normale'){
    doAction(lecture_normale, config, callback);
  }
  else if (data.action == 'pause_lecture'){
    doAction(pause_lecture, config, callback);
  }
  else if (data.action == 'stop_lecture'){
    doAction(stop_lecture, config, callback);
  }
  else if (data.action == 'demare_lecture'){
    doAction(demare_lecture, config, callback);
  }
  else if (data.action == 'lecture_2'){
    doAction(lecture_2, config, callback);
  }
  else if (data.action == 'lecture_4'){
    doAction(lecture_4, config, callback);
  }
  else if (data.action == 'lecture_8'){
    doAction(lecture_8, config, callback);
  }
  else if (data.action == 'lecture_16'){
    doAction(lecture_16, config, callback);
  }
  else if (data.action == 'lecture_32'){
    doAction(lecture_32, config, callback);
  }
  else if (data.action == 'player'){
    doAction(player, config, callback);
  }
  //tv
  else if (data.action == 'tvlive'){
    doAction(tvlive, config, callback);
  }
  else if (data.action == 'tf1'){
    doAction(tf1, config, callback);
  }
  else if (data.action == 'tf1_hd'){
    doAction(tf1_hd, config, callback);
  }
  else if (data.action == 'fr2'){
    doAction(fr2, config, callback);
  }
  else if (data.action == 'fr2_hd'){
    doAction(fr2_hd, config, callback);
  }
  else if (data.action == 'fr3'){
    doAction(fr3, config, callback);
  }
  else if (data.action == 'rtl_tvi'){
    doAction(rtl_tvi, config, callback);
  }
  else if (data.action == 'la_une'){
    doAction(la_une, config, callback);
  }
  else if (data.action == 'la_deux'){
    doAction(la_deux, config, callback);
  }
  else if (data.action == 'la_trois'){
    doAction(la_trois, config, callback);
  }
  else if (data.action == 'club_rtl'){
    doAction(club_rtl, config, callback);
  }
  else if (data.action == 'plug_tv'){
    doAction(plug_tv, config, callback);
  }
  else if (data.action == 'syfy'){
    doAction(syfy, config, callback);
  }
  else if (data.action == 'syfy_hd'){
    doAction(syfy_hd, config, callback);
  }
  else if (data.action == 'tf6'){
    doAction(tf6, config, callback);
  }
  else if (data.action == 'tf6_hd'){
    doAction(tf6_hd, config, callback);
  }
  
  
  
  
  
  
  else if (data.action == 'maison_plus'){
    doAction(maison_plus, config, callback);
  }
  else if (data.action == 'bein_sport_1'){
    doAction(bein_sport_1, config, callback);
  }
  else if (data.action == 'bein_sport_1_hd'){
    doAction(bein_sport_1_hd, config, callback);
  }
  else if (data.action == 'bein_sport_2'){
    doAction(bein_sport_2, config, callback);
  }
  else if (data.action == 'bein_sport_2_hd'){
    doAction(bein_sport_2_hd, config, callback);
  }
  
  
  // camera salon cam_salon
  else if (data.action == 'cam_salon'){
    doAction(cam_salon, config, callback);
  }
  
  else {
    callback({});
  }
}

// -------------------------------------------
//  QUERIES
//  Doc: http://wiki.xbmc.org/index.php?title=JSON-RPC_API
// -------------------------------------------
// http://192.168.1.38:8080/jsonrpc?request={%22jsonrpc%22:%222.0%22,%22method%22:%22GUI.ShowNotification%22,%22params%22:{%22title%22:%22coucou%20titre%22,%22message%22:%22message%20test%22},%22id%22:1}
//http://192.168.1.38:8080/jsonrpc?request={"jsonrpc":"2.0", "method": "Player.GetItem", "params":{"playerid":1},"id":1}

// pour changer de chaine
// http://192.168.1.38:8080/jsonrpc?request={"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":12}},"id":1}
 

/*
Select Case ComStr.ToLower
    Case "quit"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Application.Quit"",""id"":1}"
    Case "stop"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Player.Stop"",""params"":{""playerid"":" & PlayerID & "},""id"":1}"
    Case "playpause"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Player.PlayPause"",""params"":{""playerid"":" & PlayerID & "},""id"":1}"
    Case "down"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Down"",""id"":1}"
    Case "up"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Up"",""id"":1}"
    Case "home"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Home"",""id"":1}"
    Case "left"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Left"",""id"":1}"
    Case "right"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Right"",""id"":1}"
    Case "select"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Select"",""id"":1}"
    Case "info"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Info"",""id"":1}"
    Case "contextmenu"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.ContextMenu"",""id"":1}"
    Case "30secforward"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.Seek"",""params"":{""playerid"":" & PlayerID & ",""value"":""smallforward""}}"
    Case "30secback"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.Seek"",""params"":{""playerid"":" & PlayerID & ",""value"":""smallbackward""}}"
    Case "back"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.Back"",""id"":1}"
    Case "subtitlenext"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSubtitle"",""params"":{""playerid"":" & PlayerID & ",""subtitle"":""next""}"
    Case "subtitleoff"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSubtitle"",""params"":{""playerid"":" & PlayerID & ",""subtitle"":""off""}}"
    Case "subtitleon"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSubtitle"",""params"":{""playerid"":" & PlayerID & ",""subtitle"":""off""}}"
    Case "showosd"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""Input.ShowOSD"",""id"":1}"
    Case "setfullscreen"
        JsonStr="{""jsonrpc"": ""2.0"", ""method"": ""GUI.SetFullscreen"", ""params"": { ""fullscreen"": ""toggle"" }, ""id"": ""1""}"
    Case "movieslist"
        JsonStr="{ ""jsonrpc"": ""2.0"", ""method"": ""GUI.ActivateWindow"", ""params"": { ""window"": ""video"", ""parameters"": [ ""MovieTitles"" ] }, ""id"": 1 }"
    Case "tvlist"
        JsonStr="{""jsonrpc"": ""2.0"", ""method"": ""GUI.ActivateWindow"", ""params"": { ""window"": ""video"", ""parameters"": [ ""TvShowTitles"" ] }, ""id"": 1 }"
    Case "pvrosd"
        JsonStr="{""jsonrpc"": ""2.0"", ""method"": ""GUI.ActivateWindow"", ""params"": { ""window"": ""video"", ""pvrosdchannels""}, ""id"": 1 }"
    Case "updatevideo"
        JsonStr="{""jsonrpc"":""2.0"",""method"":""VideoLibrary.Scan"",""id"":1}"
    Case "fastforward"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSpeed"",""params"":{""playerid"":" & PlayerID & ",""speed"":""increment""}}"
    Case "rewind"
        JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSpeed"",""params"":{""playerid"":" & PlayerID & ",""speed"":""decrement""}}"
    Case "pvrosd" 
		JsonStr="{""jsonrpc"": ""2.0"", ""method"": ""GUI.ActivateWindow"", ""params"": { ""window"": ""video"", ""pvrosdchannels""}, ""id"": 1 }"  
	Case "updatevideo"
		JsonStr="{""jsonrpc"":""2.0"",""method"":""VideoLibrary.Scan"",""id"":1}"
	Case "fastforward"
		JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSpeed"",""params"":{""playerid"":1,""speed"":""increment""}}"
	Case "rewind"
		JsonStr="{""jsonrpc"":""2.0"",""id"":1,""method"":""Player.SetSpeed"",""params"":{""playerid"":1,""speed"":""decrement""}}"
	Case "nextaudio"
		JsonStr="{""jsonrpc"": ""2.0"", ""method"": ""Player.SetAudioStream"", ""params"": { ""playerid"": 1, ""stream"": ""next""}, ""id"": 1}"

	Case else
        hs.writelog("XBMC", "Command not recognised")
        exit sub
    End select




*/
//pour afficher la caméra ip
//http://192.168.1.38:8080/jsonrpc?request={"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"file": "http://192.168.1.33/mjpg/video.mjpg"}},"id":1}

// Introspect
var introspect = { "jsonrpc": "2.0", "method": "JSONRPC.Introspect", "params": { "filter": { "id": "AudioLibrary.GetSongs", "type": "method" } }, "id": 1 }

// XML Generation
var xml_artist= {"jsonrpc": "2.0", "method": "AudioLibrary.GetArtists",  "params": {}, "id": 1}
var xml_genre= {"jsonrpc": "2.0", "method": "AudioLibrary.GetGenres",  "params": {}, "id": 1}

// Toggle play / pause in current player
var play = {"jsonrpc": "2.0", "method": "Player.PlayPause",  "params": { "playerid": 0 }, "id": 1}
var player = {"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}

// Previous / Next item in current player
var next = {"jsonrpc": "2.0", "method": "Player.GoTo",     "params": { "playerid": 0, "to" : "next" }, "id": 1}
var prev = {"jsonrpc": "2.0", "method": "Player.GoTo",     "params": { "playerid": 0, "to" : "previous" }, "id": 1}

// Query library
var genres = {"jsonrpc": "2.0", "method": "AudioLibrary.GetGenres", "params": {"properties": ["title"], "limits": { "start" : 0, "end" : 20 }, "sort": { "method" : "label", "order" : "ascending" }}, "id": "AudioLibrary.GetGenres"}
var albums = {"jsonrpc": "2.0", "method": "AudioLibrary.GetAlbums", "params": {"properties": ["artist","artistid","albumlabel","year","thumbnail","genre"], "limits": { "start" : 0, "end" : 20 }, "sort": { "method" : "label", "order" : "ascending" }}, "id": "AudioLibrary.GetAlbumsByGenre"}
var songs  = {"jsonrpc": "2.0", "method": "AudioLibrary.GetSongs",  "params": {"properties": ["title", "genre", "artist", "duration", "album", "track" ], "limits": { "start" : 0, "end": 25 }, "sort": { "order": "ascending", "method": "track", "ignorearticle": true } }, "id": "libSongs"}

// Playlist
var playlist  = {"jsonrpc": "2.0", "method": "Playlist.GetItems", "params": { "properties": ["title", "album", "artist", "duration"], "playlistid": 0 }, "id": 1}
var clearlist = {"jsonrpc": "2.0", "id": 0, "method": "Playlist.Clear", "params": {"playlistid": 0}}
var addtolist = {"jsonrpc": "2.0", "id": 1, "method": "Playlist.Add",   "params": {"playlistid": 0, "item": {"songid": 10}}}
var runlist   = {"jsonrpc": "2.0", "id": 2, "method": "Player.Open",    "params": {"item": {"playlistid": 0}}}

// fleches et ok
var fleche_up  = {"jsonrpc": "2.0", "method": "Input.Up", "id": 1};
var fleche_down  = {"jsonrpc": "2.0", "method": "Input.Down", "id": 1};
var fleche_left  = {"jsonrpc": "2.0", "method": "Input.Left", "id": 1};
var fleche_right  = {"jsonrpc": "2.0", "method": "Input.Right", "id": 1};
var bouton_select  = {"jsonrpc": "2.0", "method": "Input.Select", "id": 1};
var retour_arriere = {"jsonrpc": "2.0", "method": "Input.Back", "id": 1};
var acceuil = {"jsonrpc": "2.0", "method": "Input.Home", "id": 1};

// lecture - play pause stop x1 x2 x4 x8 x16 x32
var lecture_normale = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 1};
var pause_lecture = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 0};
var stop_lecture = {"jsonrpc": "2.0", "method": "Player.Stop",  "params": { "playerid": 1 }};
var demare_lecture = {"jsonrpc": "2.0", "method": "Player.Play",  "params": { "playerid": 1 }};

var lecture_2 = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 2};
var lecture_4 = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 4};
var lecture_8 = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 8};
var lecture_16 = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 16};
var lecture_32 = {"jsonrpc": "2.0", "method": "Player.SetSpeed",  "params": { "playerid": 1 }, "speed": 32};

//tvlive
var tvlive = {"jsonrpc": "2.0", "method": "GUI.ActivateWindow", "params": { "window": 'tv'}, "id": 1};

var tf1 = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":1}},"id":1}
var tf1_hd = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":2}},"id":1}
var fr2 = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":3}},"id":1}
var fr2_hd = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":4}},"id":1}
var fr3 = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":5}},"id":1}
var rtl_tvi = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":6}},"id":1}
var la_une = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":7}},"id":1}
var la_deux = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":8}},"id":1}
var la_trois = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":9}},"id":1}
var club_rtl = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":10}},"id":1}
var plug_tv = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":11}},"id":1}
var syfy = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":12}},"id":1}
var syfy_hd = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":13}},"id":1}
var tf6 = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":14}},"id":1}
var tf6_hd = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":15}},"id":1}

var maison_plus = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":55}},"id":1}
var bein_sport_1 = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":56}},"id":1}
var bein_sport_1_hd = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":57}},"id":1}
var bein_sport_2 = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":58}},"id":1}
var bein_sport_2_hd = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"channelid":59}},"id":1}

//caméra salon
var cam_salon = {"jsonrpc":"2.0", "method": "Player.Open", "params":{"item":{"file": "http://192.168.1.33/mjpg/video.mjpg"}},"id":1};
//console.log();

var doPlaylist = function(filter, config, callback){
  // Apply filter
  songs.params['filter'] = filter;
  
  // Search songs
  doAction(songs, config, callback, function(json){
    
    // No results 
    if (!json.result.songs){
      callback({ 'tts' : "Je n'ai pas trouvé de résultats" }) 
      return false; 
    }
    
    // Clear playlist
    doAction(clearlist, config);
    
    // Iterate
    json.result.songs.forEach(function(song){
      // console.log(song.title);
      addtolist.params.item.songid = song.songid;
      doAction(addtolist, config);
    });
    
    doAction(runlist, config);
    return true; // call callback
  })
}

var doAction = function(req, config, callback, hook){

  // Send a simple JSON request
  sendJSONRequest(config.api_url, req, function(res){
 console.log(config.api_url);
 console.log(req);
	if (!handleJSONResponse(res, callback)){ return; }
    
    // Do stuff
    if (hook){
      try { if (!hook(res)){ return; }} catch(ex){ console.log(res); }
    }
    
	
    // Otherwise
    if (callback){ callback({}) };
  });
} 

var doXML = function(req, config, callback, hook){

  // Send a simple JSON request
  sendJSONRequest(config.api_url, req, function(res){

  // Generation XML Artist
  if ((typeof res.result.artists != 'undefined') && (typeof res.result.limits != 'undefined')){
		var ligneitem ='';
		var replace  = '§ -->\n'; 	
		res.result.artists.forEach(function(value) {
			ligneitem='<item>'+value.label.replace("&","and")+'<tag>out.action.artist = "'+value.label.replace("&","&amp;")+'"</tag></item>\n'
			replace+=(ligneitem);
		});
		var fs = require('fs');
		var fileXML = 'plugins/xbmc/xbmc.xml';
		var xml = fs.readFileSync(fileXML,'utf8');
		replace += '<!-- §';
		//console.log(replace);
		var regexp = new RegExp('§[^§]+§','gm');
		var xml    = xml.replace(regexp,replace);
		//console.log(xml);
		fs.writeFileSync(fileXML, xml, 'utf8');
		console.log ('XBMC plugin: Mise à jour de '+res.result.limits.total+' artistes dans xbmc.xml')
		}
	
  // Generation XML Genre
	if ((typeof res.result.genres != 'undefined') && (typeof res.result.limits != 'undefined')){
		var ligneitem ='';
		var replace  = '¤ -->\n'; 	
		res.result.genres.forEach(function(value) {
			ligneitem='<item>'+value.label.replace("&","and")+'<tag>out.action.genre = "'+value.label.replace("&","&amp;")+'"</tag></item>\n'
			replace+=(ligneitem);
		});
		var fs = require('fs');
		var fileXML = 'plugins/xbmc/xbmc.xml';
		var xml = fs.readFileSync(fileXML,'utf8');
		replace += '<!-- ¤';
		//console.log(replace);
		var regexp = new RegExp('¤[^¤]+¤','gm');
		var xml    = xml.replace(regexp,replace);
		//console.log(xml);
		fs.writeFileSync(fileXML, xml, 'utf8');
		console.log ('XBMC plugin: Mise à jour de '+res.result.limits.total+' genres dans xbmc.xml')
		}
	
    // Otherwise
    if (callback){ callback({}) };
  });
} 
// -------------------------------------------
//  JSON
// -------------------------------------------

var sendJSONRequest = function(url, reqJSON, callback){
  var request = require('request');
  request({
    'uri' : url,
    'method' : 'POST',
    'json': reqJSON
  },
  function (err, response, json){ 
    
    if (err || response.statusCode != 200) {  return callback(false);  }
    
    // Log the response
    // console.log(json);
    
    // Return the response
    callback(json);
  });
}

// config.api_url
var handleJSONResponse = function(res, callback){

  // Request error
  if (!res){ return callback({ 'tts' : "Je n'ai pas pu contacter le serveur" }); }
  
  // XBMC error
  if (res.error){
    return callback({ 'tts' : "Je n'ai pas pu executer l'action" }); 
  }
  
  return true;
} 

