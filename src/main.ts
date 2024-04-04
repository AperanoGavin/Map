/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {ActionMessage} from "@workadventure/iframe-api-typings";
import { time } from "console";


console.log('Script started successfully');

let currentPopup: any = undefined;
let actionMessage: ActionMessage | undefined;

async function main() {
    // Waiting for the API to be ready
    await WA.onInit();
    console.log('Scripting API ready');
    await bootstrapExtra()
    console.log('Scripting API Extra ready');
    console.log('Player tags: ',WA.player.tags);
    //WA.state.saveVariable(key : string, data : unknown): void
    let [currentComedian, currentAudience] = await Promise.all([WA.player.state.loadVariable("currentComedian"), WA.player.state.loadVariable("currentComedian")]); 
    
    WA.state.comedians = 

    // Récupérer les valeurs précédentes ou les définir à zéro
    currentComedian = Number.parseInt(currentComedian as string) || 0;
    currentAudience = Number.parseInt(currentAudience as string) || 0;
    await WA.players.configureTracking({
        players: true,
        movement: true,
    });
    console.log(currentComedian)
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
    
    
    if(currentComedian<=1 && (WA.player.state.role != "comedian" || WA.player.state.role != "audience")){
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
    
    WA.room.area.onEnter("gateauxPopup").subscribe(() => {
        if(WA.player.state.role === "comedian"){
            WA.ui.openPopup("idPassage", WA.player.playerId.toString(), [
                {
                    label: "Copy",
                    className: "primary",
                    callback: (popup) => {
                        navigator.clipboard.writeText(WA.player.playerId.toString() ); //afficher le numéro de passage as id du joueur 
                        popup.close()
                    }
                }
            ])
        }
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
}
main().catch(console.error);

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
