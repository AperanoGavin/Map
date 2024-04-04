/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from '@workadventure/scripting-api-extra';
import { ActionMessage } from '@workadventure/iframe-api-typings';

console.log('Script started successfully');

let currentPopup: any = undefined;
let actionMessage: ActionMessage | undefined;
const COMEDIAN_TWITCH_KEY = 'twitch-channel';

// Waiting for the API to be ready
WA.onInit()
	.then(async () => {
		console.log('Scripting API ready');
		console.log('Player tags: ', WA.player.tags);
		//WA.state.saveVariable(key : string, data : unknown): void

		//parcouri les joueurs et compter leur role si c'est un comédien faire +1
		let currentComedian = 0;
		let currentAudience = 0;
		await WA.players.configureTracking({
			players: true,
			movement: true,
		});
		//liste des joueurs
		const players = WA.players.list();

		for (const player of players) {
			if (player.state.role === 'comedian') {
				currentComedian++;
			} else if (player.state.role === 'audience') {
				currentAudience++;
			}
		}

		console.log(Array.from(players));
		//rajouter les joueurs qui entrent
		WA.players.onPlayerEnters.subscribe((player) => {
			if (player.state.role === 'comedian') {
				currentComedian++;
			}
			if (player.state.role === 'audience') {
				currentAudience++;
			}
		});

		//retirer les joueurs qui partent
		WA.players.onPlayerLeaves.subscribe((player) => {
			if (player.state.role === 'comedian') {
				currentComedian--;
			} else if (player.state.role === 'audience') {
				currentAudience--;
			}
		});

		console.log(currentComedian);

		if (
			currentComedian <= 0 &&
			(WA.player.state.role != 'comedian' || WA.player.state.role != 'audience')
		) {
			//if(currentComedian < 1 && !WA.player.state.role){

			WA.ui.openPopup('chooseRole', 'Choose your role', [
				{
					label: 'Comedian',
					className: 'primary',
					callback: (popup) => {
						WA.player.state.saveVariable('role', 'comedian', {
							public: true,
							persist: true,
							ttl: 24 * 3600,
							scope: 'world',
						});
						currentComedian++;

						WA.chat.open();
						WA.chat.sendChatMessage(
							'👉 Type your Twitch channel for people to watch you live! 👈',
						);
						WA.chat.onChatMessage((message) => {
							WA.player.state.saveVariable(COMEDIAN_TWITCH_KEY, message.trim(), {
								public: true,
								persist: true,
								ttl: 24 * 3600,
								scope: 'world',
							});
						});

						popup.close();
					},
				},
				{
					label: 'Audience',
					className: 'primary',
					callback: (popup) => {
						WA.player.state.saveVariable('role', 'audience', {
							public: true,
							persist: true,
							ttl: 24 * 3600,
							scope: 'world',
						});
						currentAudience++;
						popup.close();
					},
				},
			]);
		}

		WA.player.state.saveVariable('role', 'audience', {
			public: true,
			persist: true,
			ttl: 24 * 3600,
			scope: 'world',
		});

		WA.room.area.onEnter('gateauxPopup').subscribe(() => {
			console.log(WA.player.playerId);
			if (WA.player.state.role === 'comedian') {
				WA.ui.openPopup('idPassage', WA.player.playerId.toString(), [
					{
						label: 'Copy',
						className: 'primary',
						callback: (popup) => {
							navigator.clipboard.writeText(WA.player.playerId.toString()); //afficher le numéro de passage as id du joueur
							popup.close();
						},
					},
				]);
			}
		});

		WA.room.area.onEnter('toilettePopup').subscribe(() => {
			actionMessage = WA.ui.displayActionMessage({
				type: 'message',
				message: 'Press SPACE to use WC',
				callback: () => {
					currentPopup = WA.ui.openPopup('toilettePopup', '5', []);
				},
			});
		});

		WA.room.area.onLeave('toilettePopup').subscribe(() => {
			if (actionMessage !== undefined) {
				actionMessage.remove();
				actionMessage = undefined;
			}
		});

		WA.room.area.onEnter('gateauxPopup').subscribe(() => {
			actionMessage = WA.ui.displayActionMessage({
				type: 'message',
				message: 'Press SPACE to eat the cake',
				callback: () => {
					currentPopup = WA.ui.openPopup('gateauxPopup', '7', []);
				},
			});
		});

		WA.room.area.onLeave('gateauxPopup').subscribe(() => {
			if (actionMessage !== undefined) {
				actionMessage.remove();
				actionMessage = undefined;
			}
		});

		WA.room.area.onEnter('dehorePopup').subscribe(() => {
			actionMessage = WA.ui.displayActionMessage({
				type: 'message',
				message: 'Press SPACE to brezze',
				callback: () => {
					currentPopup = WA.ui.openPopup('dehorePopup', 'A', []);
				},
			});
		});

		WA.room.area.onLeave('dehorePopup').subscribe(() => {
			if (actionMessage !== undefined) {
				actionMessage.remove();
				actionMessage = undefined;
			}
		});

		WA.room.area.onEnter('leftPlantPopup').subscribe(() => {
			// Remplacez VIDEO_ID par l'ID de la vidéo YouTube
			const comedianTwitchChannel =
				WA.player.state.loadVariable(COMEDIAN_TWITCH_KEY);
			const videoUrl = `https://player.twitch.tv/?channel=${comedianTwitchChannel}&parent=play.workadventu.re`;

			WA.nav.openCoWebSite(videoUrl, true);
		});

		//FOR LEAVE THE POP UP
		WA.room.area.onLeave('clock').subscribe(closePopup);
		WA.room.area.onLeave('gateauxPopup').subscribe(closePopup);
		WA.room.area.onLeave('toilettePopup').subscribe(closePopup);
		WA.room.area.onLeave('dehorePopup').subscribe(closePopup);

		// === === //

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
