var volume_demandee ="";
exports.action = function (data, callback, config, SARAH) {
	// Retrieve config
    var  api_url;
    config = config.modules.xbmc;
	if ((!config.api_url_xbmc_music)||(!config.api_url_xbmc_video) ||(!config.api_url_xbmc_tv)) {
        return callback({ 'tts': 'Configuration XBMC invalide' });
    }
	if (data.xbmc=='music') 		{ xbmc_api_url=config.api_url_xbmc_music;}
	else if (data.xbmc=='video') 	{ xbmc_api_url=config.api_url_xbmc_video;}
	else if (data.xbmc=='tv') 	{ xbmc_api_url=config.api_url_xbmc_tv;}
	else  {return callback({ 'tts': 'Choix du XBMC inconnu!'});}

	switch (data.action) {
        case 'introspect':
            doAction(xml, xbmc_api_url, callback);
            break;
        case 'xml_artist':
            doXML(xml_artist, xbmc_api_url, callback);
            break;
        case 'xml_genre':
            doXML(xml_genre, xbmc_api_url, callback);
            break;
		case 'xml_serie':
			doXML(xml_serie, xbmc_api_url, callback);
			break;
		case 'playlist':
            var filter = {"and": []};
            if (data.genre) {
                filter.and.push({"field": "genre", "operator": "contains", "value": data.genre});
            }
            if (data.artist) {
                filter.and.push({"field": "artist", "operator": "contains", "value": data.artist});
            }
            if (data.title) {
                filter.and.push({"field": "title", "operator": "contains", "value": data.title});
            }
            if (data.dictation) {
                var regexp = /sarah\srecherche\s(\w+)/gi
                var match = regexp.exec(data.dictation);
                if (match) {
                    filter = {"or": []};
                    filter.or.push({"field": "title", "operator": "contains", "value": match[1]});
                    filter.or.push({"field": "artist", "operator": "contains", "value": match[1]});
                }
            }
            doPlaylist(filter, xbmc_api_url, callback);
            break;
        case 'artist':
            var filter = {"and": []};
            if (data.artist) {
                filter.and.push({"field": "artist", "operator": "contains", "value": data.artist});
            }
            doPlaylist(filter, xbmc_api_url, callback);
            break;
		case 'tvshowtitle': 
			doPlaylistSerie(data.showid ,xbmc_api_url , callback);
			break;
		case 'play':
            doAction(play, xbmc_api_url, callback);
            break;
		case 'playvideo':
            doAction(playvideo, xbmc_api_url, callback);
            break;
        case 'next':
            doAction(next, xbmc_api_url, callback);
            break;
        case 'prev':
            doAction(prev, xbmc_api_url, callback);
            break;
        case 'player':
            doAction(player, xbmc_api_url, callback);
            break;
        case 'volup':
            doAction(volup, xbmc_api_url, callback);
            break;
        case 'volmid':
            doAction(volmid, xbmc_api_url, callback);
            break;
        case 'voldown':
            doAction(voldown, xbmc_api_url, callback);
            break;
			
			
		case 'fleche_up':
            doAction(fleche_up, xbmc_api_url, callback);
            break;
			
		case 'fleche_down':
            doAction(fleche_down, xbmc_api_url, callback);
            break;

		case 'fleche_left':
			doAction(fleche_left, xbmc_api_url, callback);
			break;

		case 'fleche_right':
			doAction(fleche_right, xbmc_api_url, callback);
			break;			


		case 'bouton_select':
			doAction(bouton_select, xbmc_api_url, callback);
			break;	

		case 'retour_arriere':
			doAction(retour_arriere, xbmc_api_url, callback);
			break;	

		case 'acceuil':
			doAction(acceuil, xbmc_api_url, callback);
			break;	

		case 'lecture_normale':
			doAction(lecture_normale, xbmc_api_url, callback);
			break;	

		case 'pause_lecture':
			doAction(pause_lecture, xbmc_api_url, callback);
			break;	

		case 'stop_lecture':
			doAction(stop_lecture, xbmc_api_url, callback);
			break;	

			
			
		case 'demare_lecture':
			doAction(demare_lecture, xbmc_api_url, callback);
			break;	
			
		case 'lecture_2':
			doAction(lecture_2, xbmc_api_url, callback);
			break;	
			
		case 'lecture_4':
			doAction(lecture_4, xbmc_api_url, callback);
			break;	
			
		case 'lecture_8':
			doAction(lecture_8, xbmc_api_url, callback);
			break;	

		case 'lecture_16':
			doAction(lecture_16, xbmc_api_url, callback);
			break;
			
		case 'lecture_32':
			doAction(lecture_32, xbmc_api_url, callback);
			break;

		case 'tvlive':
			doAction(tvlive, xbmc_api_url, callback);
			break;
			
		case 'tf1':
			doAction(tf1, xbmc_api_url, callback);
			break;
			
		case 'tf1_hd':
			doAction(tf1_hd, xbmc_api_url, callback);
			break;

		case 'fr2':
			doAction(fr2, xbmc_api_url, callback);
			break;			

		case 'fr2_hd':
			doAction(fr2_hd, xbmc_api_url, callback);
			break;

		case 'fr3':
			doAction(fr3, xbmc_api_url, callback);
			break;

		case 'rtl_tvi':
			doAction(rtl_tvi, xbmc_api_url, callback);
			break;

		case 'la_une':
			doAction(la_une, xbmc_api_url, callback);
			break;

		case 'la_deux':
			doAction(la_deux, xbmc_api_url, callback);
			break;

		case 'la_trois':
			doAction(la_trois, xbmc_api_url, callback);
			break;

		case 'club_rtl':
			doAction(club_rtl, xbmc_api_url, callback);
			break;			

		case 'plug_tv':
			doAction(plug_tv, xbmc_api_url, callback);
			break;	

		case 'syfy':
			doAction(syfy, xbmc_api_url, callback);
			break;	

		case 'syfy_hd':
			doAction(syfy_hd, xbmc_api_url, callback);
			break;	

		case 'tf6':
			doAction(tf6, xbmc_api_url, callback);
			break;	

		case 'tf6_hd':
			doAction(tf6_hd, xbmc_api_url, callback);
			break;	

			
			
			
			
			
			
			
		case 'maison_plus':
			doAction(maison_plus, xbmc_api_url, callback);
			break;		
			
		case 'bein_sport_1':
			doAction(bein_sport_1, xbmc_api_url, callback);
			break;	
			
		case 'bein_sport_1_hd':
			doAction(bein_sport_1_hd, xbmc_api_url, callback);
			break;	
			
		case 'bein_sport_2':
			doAction(bein_sport_2, xbmc_api_url, callback);
			break;				
			
		case 'bein_sport_2_hd':
			doAction(bein_sport_2_hd, xbmc_api_url, callback);
			break;
			
		case 'cam_salon':
			doAction(cam_salon, xbmc_api_url, callback);
			break;				
			
        default:
            callback({});
            break;
    }
}

// -------------------------------------------
//  QUERIES
//  Doc: http://wiki.xbmc.org/index.php?title=JSON-RPC_API
// -------------------------------------------

// Introspect
var introspect = { "jsonrpc": "2.0", "method": "JSONRPC.Introspect", "params": { "filter": { "id": "AudioLibrary.GetSongs", "type": "method" } }, "id": 1 }

// XML Generation
var xml_artist = {"jsonrpc": "2.0", "method": "AudioLibrary.GetArtists", "params": {}, "id": 1}
var xml_genre = {"jsonrpc": "2.0", "method": "AudioLibrary.GetGenres", "params": {}, "id": 1}
var xml_serie={"jsonrpc": "2.0", "method": "VideoLibrary.GetTVShows", "params": {}, "id": 1}

// Toggle play / pause in current player
var play = {"jsonrpc": "2.0", "method": "Player.PlayPause", "params": { "playerid": 0 }, "id": 1};
var player = {"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}

// Toggle play / pause in current player video
var playvideo = {"jsonrpc": "2.0", "method": "Player.PlayPause", "params": { "playerid": 1 }, "id": 1};


// Previous / Next item in current player
var next = {"jsonrpc": "2.0", "method": "Player.GoTo", "params": { "playerid": 0, "to": "next" }, "id": 1}
var prev = {"jsonrpc": "2.0", "method": "Player.GoTo", "params": { "playerid": 0, "to": "previous" }, "id": 1}

// Set Volume in current player
var volup = {"jsonrpc": "2.0", "method": "Application.SetVolume", "params": { "volume": 100}, "id": 1}
var volmid = {"jsonrpc": "2.0", "method": "Application.SetVolume", "params": { "volume": 80}, "id": 1}
var voldown = {"jsonrpc": "2.0", "method": "Application.SetVolume", "params": { "volume": 50}, "id": 1}

// Query library
var genres = {"jsonrpc": "2.0", "method": "AudioLibrary.GetGenres", "params": {"properties": ["title"], "limits": { "start": 0, "end": 20 }, "sort": { "method": "label", "order": "ascending" }}, "id": "AudioLibrary.GetGenres"}
var albums = {"jsonrpc": "2.0", "method": "AudioLibrary.GetAlbums", "params": {"properties": ["artist", "artistid", "albumlabel", "year", "thumbnail", "genre"], "limits": { "start": 0, "end": 20 }, "sort": { "method": "label", "order": "ascending" }}, "id": "AudioLibrary.GetAlbumsByGenre"}
var songs = {"jsonrpc": "2.0", "method": "AudioLibrary.GetSongs", "params": {"properties": ["title", "genre", "artist", "duration", "album", "track" ], "limits": { "start": 0, "end": 25 }, "sort": { "order": "ascending", "method": "track", "ignorearticle": true } }, "id": "libSongs"}
var saison={"jsonrpc": "2.0", "method": "VideoLibrary.GetSeasons","params": { "tvshowid": 1 ,"properties": ["season", "thumbnail"]}, "id": 1}
var episode = {"jsonrpc": "2.0", "method": "VideoLibrary.GetEpisodes","params": { "tvshowid": 1 , "season": 1 ,"properties": ["title", "firstaired", "playcount", "runtime", "season", "episode", "file", "streamdetails", "lastplayed", "uniqueid"], "limits": { "start" : 0, "end": 25 }, "sort": { "order": "ascending", "method": "track", "ignorearticle": true }}, "id": 1}

// Playlist
var playlist = {"jsonrpc": "2.0", "method": "Playlist.GetItems", "params": { "properties": ["title", "album", "artist", "duration"], "playlistid": 0 }, "id": 1}
var clearlist = {"jsonrpc": "2.0", "id": 0, "method": "Playlist.Clear", "params": {"playlistid": 0}}
var addtolist = {"jsonrpc": "2.0", "id": 1, "method": "Playlist.Add", "params": {"playlistid": 0, "item": {"songid": 10}}}
var runlist = {"jsonrpc": "2.0", "id": 2, "method": "Player.Open", "params": {"item": {"playlistid": 0}}}

// Séries
var playserie = {"jsonrpc": "2.0", "method": "Player.Open", "params": { "item": {"file":""} , "options":{ "resume":true } }, "id": 3}


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

doPlaylistSerie = function (id, xbmc_api_url, callback){

	var asyncEpisode=function(l_episode,reponse) {
		if (l_episode) {
			//console.log("saison = "+l_episode.season +" episode = "+l_episode.episode + " last view = "+l_episode.lastplayed + " Playcount = "+l_episode.playcount);
			if (l_episode.playcount == 0) { return reponse(l_episode);}	// si épisode non vu => renvois l'episode
			return asyncEpisode(les_episodes.shift(),reponse);// sinon poursuit à l'épisode suivant
		}
		else {return reponse(false);} // tous les épisodes de cette saison ont été vus
	}	
	
	var asyncSaison=function(la_saison,reponse) {
		if (la_saison) {
			episode.params.season=parseInt(la_saison.season);
			// récupération des épisodes
			sendJSONRequest(xbmc_api_url, episode , function(res){
				les_episodes=res.result.episodes
				asyncEpisode(les_episodes.shift(), function (reponse_episode) {
					if (reponse_episode==false) {return  asyncSaison(les_saisons.shift(),reponse);} // si FALSE alors poursuit à la saison suivante
					else {return reponse(reponse_episode);} // renvois l'épisode trouvé
				});
			});
		}
		else {return reponse(false);} // aucun épisode d'aucune série trouvée.
	}
	
	saison.params.tvshowid =  parseInt(id);
	episode.params.tvshowid =  parseInt(id);
	// récupération des saisons
	sendJSONRequest(xbmc_api_url, saison ,function(res){
		les_saisons=res.result.seasons;
		asyncSaison(les_saisons.shift(), function(reponse) {
			if (reponse==false) { callback({'tts':'Tous les épisodes ont été visionnés!'});	}
			else {
				playserie.params.item.file =  reponse.file
				doAction ( playserie , xbmc_api_url );
				callback({'tts':'lecture de l\'épisode '+reponse.episode+' de la saison '+reponse.season+"."});
			}
		});
		
	});
}

var doPlaylist = function (filter, xbmc_api_url, callback) {
    // Apply filter
    songs.params['filter'] = filter;

    // Search songs
    doAction(songs, xbmc_api_url, callback, function (json) {

        // No results
        if (!json.result.songs) {
            callback({ 'tts': "Je n'ai pas trouvé de résultats" })
            return false;
        }

        // Clear playlist
        doAction(clearlist, xbmc_api_url);

        // Iterate
        json.result.songs.forEach(function (song) {
            // console.log(song.title);
            addtolist.params.item.songid = song.songid;
            doAction(addtolist, xbmc_api_url);
        });

        doAction(runlist, xbmc_api_url);
        return true; // call callback
    })
}

var doAction = function (req, xbmc_api_url, callback, hook) {
	// Send a simple JSON request
    sendJSONRequest(xbmc_api_url, req, function (res) {
		if (!handleJSONResponse(res, callback)) {
            return;
        }

        // Do stuff
        if (hook) {
            try {
                if (!hook(res)) {
                    return;
                }
            } catch (ex) {
                console.log(res);
            }
        }

        // Otherwise
        if (callback) {
            callback({})
        }
        ;
    });
}

var doXML = function (req, xbmc_api_url, callback, hook) {

    // Send a simple JSON request
    sendJSONRequest(xbmc_api_url, req, function (res) {
        if (res) {
            // Generation XML Artist
            if ((typeof res.result.artists != 'undefined') && (typeof res.result.limits != 'undefined')) {
                var ligneitem = '';
                var lignehtml = '';
                var lignehtmlpresent = '';
                var fs = require('fs');
                var fileXML = 'plugins/xbmc/xbmc.xml';
            //efface la zone génération automatique
				var xml = fs.readFileSync(fileXML, 'utf8');
				var replace = '§ -->\n            <item>ARTIST<tag>out.action._attributes.tts = "Le fichier XML n\'a jamais été généré!"</tag></item>\n<!-- §';
				var regexp = new RegExp('§[^§]+§', 'gm');
                var xml = xml.replace(regexp, replace);
                fs.writeFileSync(fileXML, xml, 'utf8');
				console.log('XBMC plugin: Zone génération automatique artiste effacée.')
			// Génère la zone génération automatique sauf si artiste déjà présent
				replace = '§ -->\n';
				var present=0;
                res.result.artists.forEach(function (value) {
					// test si ligne déjà présente
					lignetest = '<tag>out.action.artist = "' + value.label.replace(/&/gi, "&amp;") + '"</tag>'
					var regexp = new RegExp(lignetest, 'gm');
					if (xml.match(regexp))
							{
							lignehtmlpresent += value.label.replace(/&/gi, "&amp;") + '<br>'
							present=present+1;
							}
					else {
						lignehtml += value.label.replace(/&/gi, "&amp;") + '<br>'
						ligneitem = '            <item>' + value.label.replace(/&/gi, "and") + '<tag>out.action.artist = "' + value.label.replace(/&/gi, "&amp;") + '"</tag></item>\n';
						replace += (ligneitem);
						}
                });
                var xml = fs.readFileSync(fileXML, 'utf8');
                replace += '            <!-- §';
                var regexp = new RegExp('§[^§]+§', 'gm');
                var xml = xml.replace(regexp, replace);
                fs.writeFileSync(fileXML, xml, 'utf8');
			    console.log('XBMC plugin: ' + (res.result.limits.total-present) + ' artistes générés dans xbmc.xml ( +'+present+' déjà personnalisés )');
                callback({'tts': '<b>Traitement de ' +(res.result.limits.total)+' artistes dans xbmc.xml<br><br>'+present+' personnalisés:</b><br>'+lignehtmlpresent+'<br><b>'+(res.result.limits.total-present)+' Mises à jour:</b><br>' + lignehtml})
            }

            // Generation XML Genre
            else if ((typeof res.result.genres != 'undefined') && (typeof res.result.limits != 'undefined')) {
				var ligneitem = '';
                var lignehtml = '';
                var lignehtmlpresent = '';
                var fs = require('fs');
                var fileXML = 'plugins/xbmc/xbmc.xml';
            //efface la zone génération automatique
				var xml = fs.readFileSync(fileXML, 'utf8');
				var replace = '¤ -->\n            <item>GENRE<tag>out.action._attributes.tts = "Le fichier XML n\'a jamais été généré!"</tag></item>\n<!-- ¤';
				var regexp = new RegExp('¤[^¤]+¤', 'gm');
                var xml = xml.replace(regexp, replace);
                fs.writeFileSync(fileXML, xml, 'utf8');
				console.log('XBMC plugin: Zone génération automatique genre effacée.')
			// Génère la zone génération automatique sauf si artiste déjà présent
				replace = '¤ -->\n';
				var present=0;
                res.result.genres.forEach(function (value) {
					// test si ligne déjà présente
					lignetest = '<tag>out.action.genre = "' + value.label.replace(/&/gi, "&amp;") + '"</tag>'
					var regexp = new RegExp(lignetest, 'gm');
					if (xml.match(regexp))
							{
							lignehtmlpresent += value.label.replace(/&/gi, "&amp;") + '<br>'
							present=present+1;
							}
					else {
						lignehtml += value.label.replace(/&/gi, "&amp;") + '<br>'
						ligneitem = '            <item>' + value.label.replace(/&/gi, "and") + '<tag>out.action.genre = "' + value.label.replace(/&/gi, "&amp;") + '"</tag></item>\n';
						replace += (ligneitem);
						}
                });
                var xml = fs.readFileSync(fileXML, 'utf8');
                replace += '            <!-- ¤';
                var regexp = new RegExp('¤[^¤]+¤', 'gm');
                var xml = xml.replace(regexp, replace);
                fs.writeFileSync(fileXML, xml, 'utf8');
			    console.log('XBMC plugin: ' + (res.result.limits.total-present) + ' genres générés dans xbmc.xml ( +'+present+' déjà personnalisés )');
                callback({'tts': '<b>Traitement de ' +(res.result.limits.total)+' genres dans xbmc.xml<br><br>'+present+' personnalisés:</b><br>'+lignehtmlpresent+'<br><b>'+(res.result.limits.total-present)+' Mises à jour:</b><br>' + lignehtml})
           }

			// Generation XML Series
			else if ((typeof res.result.tvshows != 'undefined') && (typeof res.result.limits != 'undefined')){
                var ligneitem = '';
                var lignehtml = '';
                var lignehtmlpresent = '';
                var fs = require('fs');
                var fileXML = 'plugins/xbmc/xbmc.xml';
            //efface la zone génération automatique
				var xml = fs.readFileSync(fileXML, 'utf8');
				var replace = '£ -->\n            <item>SERIE<tag>out.action._attributes.tts = "Le fichier XML n\'a jamais été généré!"</tag></item>\n<!-- £';
				var regexp = new RegExp('£[^£]+£', 'gm');
                var xml = xml.replace(regexp, replace);
                fs.writeFileSync(fileXML, xml, 'utf8');
				console.log('XBMC plugin: Zone génération automatique série effacée.')
			// Génère la zone génération automatique sauf si série déjà présente
				var replace  = '£ -->\n'; 	// zone a remplacer
				var present=0;
                res.result.tvshows.forEach(function(value) { //value contient label ou id
					// test si ligne déjà présente
					lignetest = '<tag>out.action.showid = "'+value.tvshowid+'"</tag>'
					var regexp = new RegExp(lignetest, 'gm');
					if (xml.match(regexp))
							{
							lignehtmlpresent += value.label.replace(/&/gi, "&amp;") + '<br>'
							present=present+1;
							}
					else {
						lignehtml += value.label.replace(/&/gi, "&amp;") + '<br>'
						ligneitem = '            <item>' + value.label.replace(/&/gi, "and") + '<tag>out.action.showid = "' + value.tvshowid + '"</tag></item>\n';
						replace += (ligneitem);
						}

					});
				var xml = fs.readFileSync(fileXML,'utf8');
				replace += '            <!-- £';
				//console.log(replace);
				var regexp = new RegExp('£[^£]+£','gm');
				var xml    = xml.replace(regexp,replace);
				//console.log(xml);
				fs.writeFileSync(fileXML, xml, 'utf8');
				console.log('XBMC plugin: ' + (res.result.limits.total-present) + ' série générées dans xbmc.xml ( +'+present+' déjà personnalisées )');
				console.log("resultat :");
				console.log((res.result.limits.total-present)+' Mises à jour:' + lignehtml);
				var result_mise_a_jour = lignehtml.replace(/<br>/g," . ")
				console.log((res.result.limits.total-present)+' Mises à jour: ' + result_mise_a_jour);
                callback({'tts': (res.result.limits.total-present)+' Mises à jour: ' + result_mise_a_jour})
			}

			// Otherwise
            else if (callback) {
                callback({'tts': 'Erreur: aucune importation effectuée!'})
            }
            ;
        }
        else {
            callback({'tts': 'Erreur!'})
        }
    });
}
// -------------------------------------------
//  JSON
// -------------------------------------------

var sendJSONRequest = function (url, reqJSON, callback) {
	var request = require('request');
    request({
            'uri': url,
            'method': 'POST',
            'json': reqJSON
        },
        function (err, response, json) {
            if (err || response.statusCode != 200) {
                return callback(false);
            }

            // Log the response
            // console.log(json);

            // Return the response
            callback(json);
        });
}

// xbmc_api_url
var handleJSONResponse = function (res, callback) {

    // Request error
    if (!res) {
        return callback({ 'tts': "Je n'ai pas pu contacter le serveur" });
    }

    // XBMC error
    if (res.error) {
		return callback({ 'tts': "Je n'ai pas pu executer l'action" });
    }

    return true;
} 

