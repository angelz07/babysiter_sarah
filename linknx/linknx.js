exports.action = function(data, callback, config, SARAH) {
	var config = config.modules.linknx;
	var net = require('net');
	var HOST = config.ip_linknx;
	var PORT = config.port_linknx; 
	var answers = config.answers.split('|');
	var type_lecture_ecriture = data.lecture_ecriture;
	
	
	// Retrieve config
	if (!config.ip_linknx || !config.port_linknx){
		console.log("Missing Linknx config");
		 callback({'tts': "il manque la configuration"});
		return;
	}
	if(data.objet_linknx)
	{
	
		if(type_lecture_ecriture == "ecriture"){
			var valeur = data.action_domo;
			var type_objet = data.type_objet;
			var data_xml = "";

			if(type_objet == "dimmer"){
				if(valeur == "1"){
					valeur = "255";
				}
				data_xml = '<write><object id=\"' + data.objet_linknx + '\" value=\"' + valeur + '\"/></write>\04';
				//console.log(data_xml);
			}

			if(type_objet == "on_off"){
				data_xml = '<write><object id=\"' + data.objet_linknx + '\" value=\"' + valeur + '\"/></write>\04';
				//console.log(data_xml);
			}

			if(type_objet == "mode"){
				data_xml = '<write><object id=\"' + data.objet_linknx + '\" value=\"' + valeur + '\"/></write>\04';
				//console.log("la personne est : "+nom_personne);
				//salutation_persone_tts = "bonjour, " + nom_personne + " , ";
				
				//console.log(data_xml);
			}

			if(type_objet == "volet"){
				data_xml = '<write><object id=\"' + data.objet_linknx + '\" value=\"' + valeur + '\"/></write>\04';
				//console.log(data_xml);
			}

			if(type_objet == "chauffage"){
				data_xml = '<write><object id=\"' + data.objet_linknx + '\" value=\"' + valeur + '\"/></write>\04';
				//console.log(data_xml);
			}

		
			envoie_linknx(data_xml, net, HOST, PORT, answers, reponse_write_linknx, callback);
		}
		
		if(type_lecture_ecriture == "lecture"){
			var nom_piece = data.piece;
			
			// piece cuisine
			if(nom_piece == "cuisine"){
				multiple_fin = false;
				
				// chauffage cuisine - chauffage_cuisine_mode_choix - chauffage_cuisine_temp_ambiante - chauffage_cuisine_setpoint_in
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_cuisine_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage de la cuisine est sur le mode : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// volet cuisine - volet_cuisine_mouton_status - volet_cuisine_pelouse_status - volet_cuisine_porte_status
				//porte cuisine
				data_xml_lecture = '<read><objects><object id="' + 'volet_cuisine_porte_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la porte de la cuisine est : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//fenetre mouton cuisine
				data_xml_lecture = '<read><objects><object id="' + 'volet_cuisine_mouton_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la fenêtre mouton de la cuisine est : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//fenetre pelouse cuisine
				data_xml_lecture = '<read><objects><object id="' + 'volet_cuisine_pelouse_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la fenêtre pelouse de la cuisine est : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// lumière cuisine - Lumiere_Cuisine_Spots_Status - Lumiere_Cuisine_Lustre_Table_Status
				// spots
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Cuisine_Spots_Valeur' + '"/></objects></read>\04';
				var texte_tts = "les spotes de la cuisine sont :  ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = ""; 
				
				// lustre
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Cuisine_Lustre_Table_Status' + '"/></objects></read>\04';
				var texte_tts = "le lustre de la cuisine est :  ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				reponse_complete_status = "";
			}
			// fin Piece Cuisine
			
			// piece salon
			if(nom_piece == "salon"){
				multiple_fin = false;
				
				// chauffage_salon_mode_choix
				//salon
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_salon_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage du salon est sur le mode : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// volet salon - volet_baie_vitree_status 
				//baie vitree
				data_xml_lecture = '<read><objects><object id="' + 'volet_baie_vitree_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la baie vitrée du salon est : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
						
				
				// lumière salon - Lumiere_Salon_Spots_Valeur
				// spots
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Salon_Spots_Valeur' + '"/></objects></read>\04';
				var texte_tts = "les spotes du salon sont :  ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
							
				reponse_complete_status = "";
			}
			// fin Piece salon
			// piece salle à manger
			if(nom_piece == "salle_a_manger"){
				multiple_fin = false;
				
				// chauffage_salle_a_mangee_mode_choix
				//salle a mangee 
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_salle_a_mangee_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage de la salle à mangée est sur le mode : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// lumière salle a mangee - Lumiere_Salle_a_Mangee_Spots_Valeur
				// spots
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Salle_a_Mangee_Spots_Valeur' + '"/></objects></read>\04';
				var texte_tts = "les spotes de la salle à mangée sont :  ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
					
				// lustre - Lumiere_Salle_a_Manger_Lustre_Table_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Salle_a_Manger_Lustre_Table_Status' + '"/></objects></read>\04';
				var texte_tts = "le lustre de la salle à mangée est :  ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				reponse_complete_status = "";
			}
			// fin Piece salle a mangee 
			
			// piece wc
			if(nom_piece == "wc"){
				multiple_fin = false;
				// lumière wc - Lumiere_Salle_a_Mangee_Spots_Valeur
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_WC0_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière des toilettes sont :  ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				reponse_complete_status = "";
			}
			// fin Piece wc
			
			// piece buanderie - petite buanderie
			if(nom_piece == "banderie"){
				multiple_fin = false;
				// lumière banderie - Lumiere_Buanderie_Plafond_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Buanderie_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière de la buanderie est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// lumière petite banderie - Lumiere_Petite_Buanderie_Plafond_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Petite_Buanderie_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière de la petite buanderie est :  ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//volet buanderie - volet_buanderie_status
				data_xml_lecture = '<read><objects><object id="' + 'volet_buanderie_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la buanderie est : ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// chaufage buanderie
				// mode chauffage - chauffage_buanderie_mode_choix
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_buanderie_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage de la buanderie est sur le mode : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
							
				// temperature buanderie - Temperature_Buanderie
				
				reponse_complete_status = "";
			}
			// fin Piece buanderie
			
			// piece bureau
			if(nom_piece == "bureau"){
				multiple_fin = false;
				// lumière bureau - Lumiere_Bureau_Plafond_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Bureau_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière du bureau est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// volet bureau - volet_bureau_status
				data_xml_lecture = '<read><objects><object id="' + 'volet_bureau_status' + '"/></objects></read>\04';
				var texte_tts = "le volet du Bureau est : ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//chauffage Bureau 
				// mode - chauffage_bureau_mode_choix
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_bureau_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage du bureau est sur le mode : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// Temperature - chauffage_bureau_temp_ambiante
				
				reponse_complete_status = "";
			}
			// fin Piece bureau
			
			// piece couloir
			if(nom_piece == "couloir"){
				multiple_fin = false;
				// lumière couloir (hall entree) - Lumiere_Hall_Plafond_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Hall_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière du couloir est :  ";
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// chauffage 
				// mode - chauffage_hall_entree_mode_choix
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_hall_entree_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage du couloir est sur le mode : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// temperature - chauffage_hall_entree_ambiante
				
				reponse_complete_status = "";
			}
			// fin Piece couloir
			
			// piece chambre1
			if(nom_piece == "chambre"){
				multiple_fin = false;
				// spots chambre 1 - Lumiere_Chambre_1_Spots_Plafond_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Chambre_1_Spots_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "les spots de la chambre sont :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// volet - volet_chambre1_status
				data_xml_lecture = '<read><objects><object id="' + 'volet_chambre1_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la chambre est : ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// chauffage 
				// mode - chauffage_chambre1_mode_choix
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_chambre1_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage de la chambre est sur le mode : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// temperature - chauffage_chambre1_ambiante
				
				reponse_complete_status = "";
			}
			// fin Piece chambre1
			
			// piece salle de bain
			if(nom_piece == "salle_de_bain"){
				multiple_fin = false;
				// lumière salle de bain - Lumiere_Salle_de_Bain_Plafond(ex_CH2)_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Salle_de_Bain_Plafond(ex_CH2)_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière de la salle de bain est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// volet - 
				// mouton - volet_sdb_mouton_status
				data_xml_lecture = '<read><objects><object id="' + 'volet_sdb_mouton_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la salle de bain côté mouton est : ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// ravel - volet_sdb_ravel_status
				data_xml_lecture = '<read><objects><object id="' + 'volet_sdb_ravel_status' + '"/></objects></read>\04';
				var texte_tts = "le volet de la salle de bain côté ravel est : ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				
				// chauffage 
				// mode - chauffage_salle_de_bain_mode_choix
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_salle_de_bain_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage de la salle de bain est sur le mode : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// temperature - chauffage_salle_de_bain_ambiante
				
				reponse_complete_status = "";
			}
			// fin Piece salle de bain
			
			// piece chambre 2 - grenier
			if(nom_piece == "grenier"){
				multiple_fin = false;
				// lumière grenier
				// pelouse -Lumiere_Chambre_2_Jardin_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Chambre_2_Jardin_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière du grenier coté jardin est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
							
				//rue - Lumiere_Chambre_2_Rue_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Chambre_2_Rue_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière du grenier coté rue est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//centre - Lumiere_Chambre_2_Central_Status
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Chambre_2_Rue_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière du grenier central est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//chauffage chambre 2 
				// mode - chauffage_chambre2_mode_choix
				data_xml_lecture = '<read><objects><object id="' + 'chauffage_chambre2_mode_choix' + '"/></objects></read>\04';
				var texte_tts = "le chauffage du grenier est sur le mode : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//temperature - chauffage_chambre2_ambiante
				
				reponse_complete_status = "";
			}
			// fin piece chambre 2 - grenier
			
			// piece escaliers - cave
			if(nom_piece == "escalier"){
				multiple_fin = false;
				// lumière escalier 0 -> 1
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Escalier_0-1_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière de l'escalier du rez-de-chaussée au premier est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// lumiere escalier 1 -> 2
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Escalier_1-2_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière de l'escalier du premier au deuxième est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				//cave
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Cave_Plafond_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière de la cave est :  ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				reponse_complete_status = "";
			}
			// fin Piece escaliers - cave
			
			
			// piece garage
			if(nom_piece == "garage"){
				multiple_fin = false;
				// lumière garage 
				
				// lumiere vide technique
				data_xml_lecture = '<read><objects><object id="' + 'Lumiere_Vide_Technique_au_dessus_WC_Neon_Status' + '"/></objects></read>\04';
				var texte_tts = "la lumière du vide technique est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				// Salle technique
				
				//volet garage - volet_garage_status
				data_xml_lecture = '<read><objects><object id="' + 'volet_garage_status' + '"/></objects></read>\04';
				var texte_tts = "le volet du garage est : ";
				multiple_fin = true;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";
				
				
				reponse_complete_status = "";
			}
			// fin Piece garage
			
			// Mode Maison
			if(nom_piece == "maison"){
				multiple_fin = false;
				var home_status	= "1"
				// temp exterieur
				/*data_xml_lecture = '<read><objects><object id="' + 'Sonde_Meteo_temp_exterieur' + '"/></objects></read>\04';
				var texte_tts = "la lumière du vide technique est :  ";
				multiple_fin = false;
				lire_linknx(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts);
				data_xml_lecture = "";
				texte_tts = "";*/
				
				//mode a la maison
				
				data_xml_lecture = '<read><objects><object id="' + 'home_status_maison' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode sortie courte
				data_xml_lecture = '<read><objects><object id="' + 'home_status_sortie_courte' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode sortie longue
				data_xml_lecture = '<read><objects><object id="' + 'home_status_sortie_longue' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode nuit
				data_xml_lecture = '<read><objects><object id="' + 'home_status_nuit' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode vacance
				data_xml_lecture = '<read><objects><object id="' + 'home_status_vacance' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode alarme
				//data_xml_lecture = '<read><objects><object id="' + 'home_status_alarme' + '"/></objects></read>\04';
				//var texte_tts = "la maison est en mode : ";
				//multiple_fin = false;
				//lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				//data_xml_lecture = "";
				//texte_tts = "";
				
				//mode soirée
				data_xml_lecture = '<read><objects><object id="' + 'home_status_soiree' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode ne pas deranger
				data_xml_lecture = '<read><objects><object id="' + 'home_status_npas_deranger' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = false;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				//mode manuel
				data_xml_lecture = '<read><objects><object id="' + 'home_status_manuel' + '"/></objects></read>\04';
				var texte_tts = "la maison est en mode : ";
				multiple_fin = true;
				lire_linknx_mode(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status);
				data_xml_lecture = "";
				texte_tts = "";
				
				reponse_complete_status = "";
			}
			// fin Piece garage
		}
	}else{
	console.log('test pas bon');
		callback({})
	return;
	}
} 
var function_dummy = function(){
   
}

var reponse_write_linknx = function(answer_reponse, callback){
   callback({ 'tts' : answer_reponse })
}

var envoie_linknx = function(data_xml, net, HOST, PORT, answers, reponse_write_linknx, callback){
	var client = new net.Socket();
	client.connect(PORT, HOST, function() {
	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	// Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
	client.write(data_xml);
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function(data) {
	//console.log('DATA: ' + data);
	if(data != "<write status='success'/>"){
	   answer = answers[ Math.floor(Math.random() * answers.length)];
	}
	else{
	  answer = "il y a eu une erreur";
	}
		
	reponse_write_linknx(answer, callback);
	// Close the client socket completely
	client.destroy();
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
	console.log('Connection closed');
	});
} 
var multiple_fin;
var reponse_complete_status = "";
var reponse_read_linknx = function(callback, multiple_fin, texte_tts){
	if(multiple_fin == true){
		reponse_complete_status = reponse_complete_status + texte_tts + " . ";
		callback({ 'tts' : reponse_complete_status })
		console.log(reponse_complete_status);
		reponse_complete_status = "";
		}
	else if(multiple_fin == false){
		reponse_complete_status = reponse_complete_status + texte_tts + ' , ';
	}
}

var lire_linknx = function(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, texte_tts, home_status){
	//var $ = require('cheerio').load(html);
	var client = new net.Socket();
	client.connect(PORT, HOST, function() {
	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	// Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
	client.write(data_xml_lecture);
	});
	
	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function(data) {
	console.log('DATA: ' + data);
	
	// on converti data buffer en string
	var taille_data = data.length;
	var data_string = data.toString('utf-8', 0, taille_data-1);
	
	// on vérifie si linknx retourne success
	var rgxp_status = /<read status="success">/i
	var match = rgxp_status.test(data_string);
	if ( match != true){
		return callback({'tts': "Je ne comprends pas"});
	}
	
	// on extrait le nom et la valeur de l'objet linknx	
	var valeur_objet_knx = data_string.match('value="([A-Za-z0-9_.]*)"');
	var nom_objet_knx = data_string.match('id="([A-Za-z0-9_.]*)"');
	
	var rgxp_valeur = /([A-Za-z]*)/i
	var match_valeur = rgxp_valeur.test(valeur_objet_knx);
	if ( match_valeur == true){
		// traduction anglais francais
		if(valeur_objet_knx[1] == "comfort"){
			texte_tts = texte_tts + "confort"
		}
		if(valeur_objet_knx[1] == "standby"){
			texte_tts = texte_tts + "économique"
		}
		if(valeur_objet_knx[1] == "night"){
			texte_tts = texte_tts + "nuit"
		}
		if(valeur_objet_knx[1] == "frost"){
			texte_tts = texte_tts + ": hors-gel"
		}
		
		//console.log('nom = ' + nom_objet_knx[1] + ' et ' + ' Valeur = ' + valeur_objet_knx[1]);
	}
	
	var rgxp_valeur_num = /([0-9.]*)/i
	var match_valeur_num = rgxp_valeur_num.test(valeur_objet_knx);
	if ( match_valeur_num == true){
		
		// test si volet
		var rgxp_nom = /volet/i
		var match_nom = rgxp_nom.test(nom_objet_knx);
		if(match_nom == true){
			// quand la réponse est des chiffres
			if(valeur_objet_knx[1] == "0" ){
				texte_tts = texte_tts + "ouvert";
			}
			if(valeur_objet_knx[1] != "0" && valeur_objet_knx[1] != "100"){
				texte_tts = texte_tts + "partiellement ouvert";
			}			
			if(valeur_objet_knx[1] == "100" ){
				texte_tts = texte_tts + "Fermer";
			}
		}
		//sinon pas volet
		else{
			
			// quand la réponse est des chiffres
			if(valeur_objet_knx[1] == "0" || valeur_objet_knx[1] == "off"){
				texte_tts = texte_tts + "éteint";
			}
			if(valeur_objet_knx[1] == "1" || valeur_objet_knx[1] == "255" || valeur_objet_knx[1] == "on"){
				texte_tts = texte_tts + "allumé";
			}
		}
	    
	}
	
	reponse_read_linknx(callback, multiple_fin, texte_tts);
	// Close the client socket completely
	client.destroy();
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
	console.log('Connection closed');
	});
} 


var lire_linknx_mode = function(texte_tts, data_xml_lecture, net, HOST, PORT, reponse_read_linknx, callback, multiple_fin, home_status){
	var client = new net.Socket();
	client.connect(PORT, HOST, function() {
	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	// Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
	client.write(data_xml_lecture);
	});
	
	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function(data) {
	console.log('DATA: ' + data);
	
	// on converti data buffer en string
	var taille_data = data.length;
	var data_string = data.toString('utf-8', 0, taille_data-1);
	
	// on vérifie si linknx retourne success
	var rgxp_status = /<read status="success">/i
	var match = rgxp_status.test(data_string);
	if ( match != true){
		return callback({'tts': "Je ne comprends pas"});
	}
	
	// on extrait le nom et la valeur de l'objet linknx	
	var valeur_objet_knx = data_string.match('value="([A-Za-z0-9_.]*)"');
	var nom_objet_knx = data_string.match('id="([A-Za-z0-9_.]*)"');
	
		if(valeur_objet_knx[1] == "on" || valeur_objet_knx[1] == "1"){
			if(nom_objet_knx[1] == "home_status_maison"){
				texte_tts = texte_tts + "à la maison";
			}
			if(nom_objet_knx[1] == "home_status_sortie_courte"){
				texte_tts = texte_tts + "absence courte";
			}
			if(nom_objet_knx[1] == "home_status_sortie_longue"){
				texte_tts = texte_tts + "absence longue";
			}
			if(nom_objet_knx[1] == "home_status_nuit"){
				texte_tts = texte_tts + "nuit";
			}
			if(nom_objet_knx[1] == "home_status_vacance"){
				texte_tts = texte_tts + "en vacance";
			}
			if(nom_objet_knx[1] == "home_status_soiree"){
				texte_tts = texte_tts + "en soirée";
			}
			if(nom_objet_knx[1] == "home_status_npas_deranger"){
				texte_tts = texte_tts + "ne pas déranger";
			}
			if(nom_objet_knx[1] == "home_status_manuel"){
				texte_tts = texte_tts + "manuel";
			}
			//if(nom_objet_knx[1] == "home_status_alarme"){
			//	texte_tts = texte_tts + "alarme";
			//}
		}
		
		if(valeur_objet_knx[1] == "off" || valeur_objet_knx[1] == "0"){
			texte_tts = "";
		}
	    
	
	
	reponse_read_linknx(callback, multiple_fin, texte_tts);
	// Close the client socket completely
	client.destroy();
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
	console.log('Connection closed');
	});
} 

