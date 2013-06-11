exports.action = function(data, callback, config, SARAH){
console.log("debut histoire");

  


var campagne     = "plugins/histoire_live/mp3/sf_campagne_criquet.mp3";
var orage     = "plugins/histoire_live/mp3/lightining.mp3";
var porte     = "plugins/histoire_live/mp3/creaky1.mp3";
var parquet     = "plugins/histoire_live/mp3/sf_bois_grincement-x2_parquet.mp3";


  
  SARAH.speak("Il était une fois, dans une grande maison a la campagne un couple tranquillement assis devant la tv.");
  SARAH.remote({
	    'play' : campagne,		  
  });
  SARAH.speak("quand tout à coup un orage éclatât.");
	setTimeout(function(){
      SARAH.remote({
		  'play' : orage,
		  'pause' : campagne
      });
    }, 9000);
	
	setTimeout(function(){
      SARAH.speak("Soudain, des bruits bizarres se firent entendre dans la maison. Des portes qui s'ouvrent puis, qui se ferment !")
    }, 12000);
  setTimeout(function(){
      SARAH.remote({
		  'play' : porte
      });
    }, 15000);
 setTimeout(function(){
      SARAH.speak("Des bruits de pas à l'étage.")
	   SARAH.remote({
		  'play' : parquet
      });
    }, 23000);
	setTimeout(function(){
      SARAH.remote({
		  'play' : parquet
      });
    }, 25000);
  setTimeout(function(){
      SARAH.speak("Les lumières de la pièce se mirent elle aussi a réagir bizarrement...")
	  
	  for (i = 0; i < 30; i++) 
		{ 
		SARAH.script('/sarah/linknx?action_domo=1&lecture_ecriture=ecriture&objet_linknx=Lumiere_Salle_a_Manger_Lustre_Table_Cmd&type_objet=on_off');
		SARAH.script('/sarah/linknx?action_domo=0&lecture_ecriture=ecriture&objet_linknx=Lumiere_Salle_a_Manger_Lustre_Table_Cmd&type_objet=on_off');
		} 
		SARAH.script('/sarah/linknx?action_domo=1&lecture_ecriture=ecriture&objet_linknx=Lumiere_Salle_a_Manger_Lustre_Table_Cmd&type_objet=on_off');
    }, 30000);
  
  setTimeout(function(){
  SARAH.script('/sarah/linknx?action_domo=1&lecture_ecriture=ecriture&objet_linknx=Lumiere_Salle_a_Manger_Lustre_Table_Cmd&type_objet=on_off');
      SARAH.speak("pendant que l'orage redoublait de force.")
	   SARAH.remote({
		  'play' : orage
      });
    }, 40000);
	
	setTimeout(function(){
      SARAH.speak("quand soudain tout s'arrêta")
	   
    }, 45000);
	setTimeout(function(){
      SARAH.speak("Les lumières, les bruits et même la télévision se coupèrent comme si quelqu'un avait appuyez sur un bouton.")
	  
	  
    }, 50000);
	
	setTimeout(function(){
	console.log('test');
      SARAH.script('/sarah/linknx?action_domo=0&lecture_ecriture=ecriture&objet_linknx=Lumiere_Salle_a_Manger_Lustre_Table_Cmd&type_objet=on_off');
	  SARAH.script('/sarah/linknx?action_domo=0&lecture_ecriture=ecriture&objet_linknx=Prise_Salon_Multimedia_5_TV&type_objet=on_off');
    }, 53000);
	
	setTimeout(function(){
      SARAH.speak("Quelques seconde plus tard tout revins à la normale et nos 2 jeunes habitant se mirent enfin à respirer.")
    }, 50000);
	 
	
	setTimeout(function(){
      return callback({ "tts" : "fin de l'histoire" })
    }, 60000);
	
	
 //out.action.objet_linknx ="Lumiere_Salle_a_Manger_Lustre_Table_Cmd";out.action.type_objet ="on_off"</tag>
  
  //SARAH.speak("");
  //SARAH.script('/sarah/linknx?periphId=12350&periphValue=0');



/*, 
 , 
, , 







*/

  
}

