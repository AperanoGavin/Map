/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {ActionMessage} from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let currentPopup: any = undefined;
let actionMessage: ActionMessage | undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)



    // === THE MESSAGE === //

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
    // === LA POP UP === //

    //FOR ENTER THE POPUP
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup =WA.ui.openPopup("clockPopup", "It's " + time, []);
    })


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
