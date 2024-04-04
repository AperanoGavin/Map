/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {ActionMessage} from "@workadventure/iframe-api-typings";


console.log('Script started successfully');

let currentPopup: any = undefined;
let actionMessage: ActionMessage | undefined;

// Waiting for the API to be ready
WA.onInit().then(async() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    //WA.state.saveVariable(key : string, data : unknown): void

    //parcouri les joueurs et compter leur role si c'est un comédien faire +1
    let currentComedian = 0;
    let currentAudience = 0;
    await WA.players.configureTracking({
        players: true,
        movement: true,
    }

    );
    //liste des joueurs
    const players = WA.players.list();

    for (const player of players) {
        if(player.state.role === "comedian"){
            currentComedian++;
        }
        else if(player.state.role === "audience"){
            currentAudience++;
        }
    }

    console.log(Array.from(players))
    //rajouter les joueurs qui entrent 
    WA.players.onPlayerEnters.subscribe((player) => {

        if(player.state.role === "comedian"){
            currentComedian++;
        }
        else if(player.state.role === "audience"){
            currentAudience++;
        }
    });

    //retirer les joueurs qui partent
    WA.players.onPlayerLeaves.subscribe((player) => {

        if(player.state.role === "comedian"){
            currentComedian--;
        }
        else if(player.state.role === "audience"){
            currentAudience--;
        }
    });

 
    console.log(currentComedian)


    if(currentComedian<=0 && (WA.player.state.role != "comedian" || WA.player.state.role != "audience")){
    //if(currentComedian < 1 && !WA.player.state.role){


        WA.ui.openPopup("chooseRole", "Choose your role", [
            {
                label: "Comedian",
                className: "primary",
                callback: (popup) => {
                    WA.player.state.saveVariable("role", "comedian", {
                        public: true,
                        persist: true,
                        ttl: 24 * 3600,
                        scope: "world",
                    });
                    currentComedian++;
                    console.log(currentComedian)
                    popup.close()
                }
            },
            {
                label: "Audience",
                className: "primary",
                callback: (popup) => {
                    WA.player.state.saveVariable("role", "audience", {
                        public: true,
                        persist: true,
                        ttl: 24 * 3600,
                        scope: "world",
                    });
                    currentAudience++;
                    popup.close()
                }
            }
        ]) 
    }

    WA.player.state.saveVariable("role", "audience", {
        public: true,
        persist: true,
        ttl: 24 * 3600,
        scope: "world",
    });


   

    WA.room.area.onEnter("toilettePopup").subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
        type: "message",
        message: "Press SPACE to use WC",
        callback: () => {
            currentPopup = WA.ui.openPopup("toilettePopup", "5" , []);
        }
        });
    });


    WA.room.area.onLeave("toilettePopup").subscribe(() => {
        if (actionMessage !== undefined) {
        actionMessage.remove();
        actionMessage = undefined;
        }
    });



    WA.room.area.onEnter("gateauxPopup").subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
        type: "message",
        message: "Press SPACE to eat the cake",
        callback: () => {
            currentPopup = WA.ui.openPopup("gateauxPopup", "7" , []);
        }
        });
    });


    WA.room.area.onLeave("gateauxPopup").subscribe(() => {
        if (actionMessage !== undefined) {
        actionMessage.remove();
        actionMessage = undefined;
        }
    });

    
    WA.room.area.onEnter("dehorePopup").subscribe(() => {
        actionMessage = WA.ui.displayActionMessage({
        type: "message",
        message: "Press SPACE to brezze",
        callback: () => {
            currentPopup = WA.ui.openPopup("dehorePopup", "A" , []);
        }
        });
    });

    WA.room.area.onLeave("dehorePopup").subscribe(() => {
        if (actionMessage !== undefined) {
        actionMessage.remove();
        actionMessage = undefined;
        }
    });
  
  	WA.room.area.onEnter('clock').subscribe(() => {
			const videoUrl =
				'https://player.twitch.tv/?channel=loic_z&parent=play.workadventu.re'; // Remplacez VIDEO_ID par l'ID de la vidéo YouTube
			WA.nav.openCoWebSite(videoUrl, true);
		});



    //FOR LEAVE THE POP UP
    WA.room.area.onLeave('clock').subscribe(closePopup)
    WA.room.area.onLeave('gateauxPopup').subscribe(closePopup)
    WA.room.area.onLeave('toilettePopup').subscribe(closePopup)
    WA.room.area.onLeave('dehorePopup').subscribe(closePopup)



    // === === //

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
