/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from '@workadventure/scripting-api-extra';

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
	.then(() => {
		console.log('Scripting API ready');
		console.log('Player tags: ', WA.player.tags);

		// Remplacez 'clock' par l'ID de la zone où vous souhaitez afficher la vidéo
		WA.room.area.onEnter('clock').subscribe(() => {
			const videoUrl = 'https://www.youtube.com/embed/BjQm3utCw9w'; // Remplacez VIDEO_ID par l'ID de la vidéo YouTube
			WA.nav.openCoWebSite(videoUrl, true);
		});

		WA.room.area.onLeave('clock').subscribe(closePopup);

		// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
		bootstrapExtra()
			.then(() => {
				console.log('Scripting API Extra ready');
			})
			.catch((e) => console.error(e));
	})
	.catch((e) => console.error(e));

function closePopup() {
	if (currentPopup !== undefined) {
		currentPopup.close();
		currentPopup = undefined;
	}
}

export {};
