/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    //WA.state.saveVariable(key : string, data : unknown): void

    //parcouri les joueurs et compter leur role si c'est un comédien faire +1
    let currentComedian = 0;
    let currentAudience = 0;
    const players = WA.players.list();



    for (const player of players) {
        if(player.state.role === "comedian"){
            currentComedian++;
        }
        else if(player.state.role === "audience"){
            currentAudience++;
        }
    }
    //demander pour recuperer toutes les variables de tous les joueurs

    //si un joueur change sa variable role alors on met à jour le compteur de comédien et d'audience 
   /*  WA.state.onVariableChange('role').subscribe((value) => {
        if(value === "comedian"){
            currentComedian++;
        }
        else if(value === "audience"){
            currentAudience++;
        }
    }); */


    console.log(currentComedian)
    console.log(WA.player.state.role)
    if(currentComedian<=0 || (WA.player.state.role === "comedian" || WA.player.state.role === "audience")){


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
                    console.log(currentAudience)
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


   
        

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

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
