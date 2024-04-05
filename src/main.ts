/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from '@workadventure/scripting-api-extra';
import { ActionMessage } from '@workadventure/iframe-api-typings';
import { playSoundOnChatCommand } from './reactions';

console.log('Script started successfully');

let currentPopup: any = undefined;
let actionMessage: ActionMessage | undefined;

const COMEDIAN_TWITCH_KEY = 'twitch-channel';

function closeTwitchIframe() {
	WA.nav.closeCoWebSite(); // Cette fonction fermera l'iframe Twitch
}

async function main() {
	// Waiting for the API to be ready
	await WA.onInit();
	console.log('Scripting API ready');
	await bootstrapExtra();
	console.log('Scripting API Extra ready');
	//WA.state.saveVariable(key : string, data : unknown): void
	// Initialize currentComedian to count the number of players with the "comedian" role
	await delay(2000);
	let currentComedian = countPlayersByRole('comedian');
	let currentAudience = 0;

	// Configure player tracking
	await WA.players.configureTracking({
		players: true,
		movement: true,
	});
	console.log(currentComedian);
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
		} else if (player.state.role === 'audience') {
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
		currentComedian <= 1 &&
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
					console.log(currentComedian);
					popup.close();
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

	WA.room.area.onEnter('start').subscribe(() => {
		console.log('start');
		//rediriger tout ce qui ont le role audience vers la zone "audience" et les comediens vers la zone "comedian"
		WA.room.area.onEnter('start').subscribe(() => {
			console.log('start');
			//set un parametre sur le joueur qu'on va appeler  root

			// Initiate movement for the player
			movePlayerToRandomLocation(WA.player);

			// Set an interval to continue movement
			const intervalId = setInterval(() => {
				movePlayerToRandomLocation(WA.player);
			}, 100);

			setTimeout(() => {
				clearInterval(intervalId);
			}, 1000);
		});
	});

	//si un joueur avec le role comedian entre dans la zone "spectacle"  on  commence un compteur de 30 secondes et à la fin
	// on affichera un message pour dire que c'est au tour du deuxieme comédien

	WA.state.onVariableChange('start_stream').subscribe((value) => {
		const comedianTwitchChannel = WA.state.twitch;
		const videoUrl = `https://player.twitch.tv/?channel=${comedianTwitchChannel}&parent=play.workadventu.re`;
		WA.nav.openCoWebSite(videoUrl, true);
	});

	WA.room.area.onEnter('spectacle').subscribe(() => {
		if (WA.player.state.role === 'comedian') {
			WA.ui.openPopup('before', 'You have 5 seconds to start your show', [
				{
					label: 'Start',
					className: 'primary',
					callback: (popup) => {
						WA.state.twitch = WA.player.state.loadVariable(COMEDIAN_TWITCH_KEY);
						WA.state.start_stream = true;
						WA.player.state.saveVariable('comedianPassed', true, {
							public: true,
							persist: true,
							ttl: 24 * 3600,
							scope: 'world',
						});
						popup.close();
						let timeleft = 5;
						let countDownPopup;
						const intervalId = setInterval(() => {
							if (countDownPopup) {
								countDownPopup.close();
							}
							countDownPopup = showInitialPopup(timeleft);
							timeleft--;
							if (timeleft === 0) {
								setTimeout(() => {
									if (countDownPopup) {
										countDownPopup.close();
									}
									closeTwitchIframe();
								}, 1000);
								clearInterval(intervalId);
							}
						}, 2000);
					},
				},
			]);
		} else {
			let closePop = WA.ui.openPopup('before', "Get lost you shouldn't be here", []);

			setTimeout(() => {
				closePop.close();
			}, 2000);
		}
	});

	WA.room.area.onLeave('spectacle').subscribe(() => {
		if (actionMessage !== undefined) {
			actionMessage.remove();
			actionMessage = undefined;
		}
	});

	WA.room.area.onEnter('vote').subscribe(() => {
		console.log('vote');
		checkComedians();
	});

	WA.room.area.onLeave('start').subscribe(() => {
		if (actionMessage !== undefined) {
			actionMessage.remove();
			actionMessage = undefined;
		}
	});

	WA.room.area.onEnter('gateauxPopup').subscribe(() => {
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

	WA.room.area.onEnter('clock').subscribe(() => {
		const videoUrl =
			'https://player.twitch.tv/?channel=loic_z&parent=play.workadventu.re'; // Remplacez VIDEO_ID par l'ID de la vidéo YouTube
		WA.nav.openCoWebSite(videoUrl, true);
	});
	console.log(WA.player.state.role);

	WA.room.area.onEnter('Scene').subscribe(() => {
		if (WA.player.state.role === 'audience') {
			console.log('PLAY SOUND !!');
			playSoundOnChatCommand();
		}
	});

	//verifier si les deux comedians on preste leur show et lance le vote ou un comedien peut le lancer manuellement

	//FOR LEAVE THE POP UP
	WA.room.area.onLeave('clock').subscribe(closePopup);
	WA.room.area.onLeave('gateauxPopup').subscribe(closePopup);
	WA.room.area.onLeave('toilettePopup').subscribe(closePopup);
	WA.room.area.onLeave('dehorePopup').subscribe(closePopup);
	WA.room.area.onLeave('start').subscribe(closePopup);
	WA.room.area.onLeave('Started').subscribe(closePopup);

	//lancer ce code chaque 5 secondes
}

main().catch(console.error);

function movePlayerToRandomLocation(player) {
	//verifier si le joueur est un comédien ou un audience
	if (WA.player.state.role === 'audience') {
		//pour audience on le redirige vers la zone audience aleatoirement entre x = 491.69 et y= 274.14 speed = 0.1
		WA.player.moveTo(491.69, 274.14, 10);
	} else if (WA.player.state.role === 'comedian') {
		//pour comedian on le redirige vers la zone comedian aleatoirement entre x = 684.47 et y= 159.18  speed = 0.1
		WA.player.moveTo(684.47, 159.18, 10);
	}
}

//parcourir la liste des joueurs et si y'a deux avec comedianPassed à true on lance le vote
function checkComedians() {
	const players = WA.players.list();
	let comedians = 0;
	for (const player of players) {
		if (player.state.role === 'comedian' && player.state.comedianPassed === true) {
			comedians++;
		}
	}
	if (comedians === 2) {
		WA.ui.openPopup('before', 'Vote for the best comedian', [
			{
				label: 'Player 1',
				className: 'primary',
				callback: (popup) => {
					popup.close();
				},
			},
			{
				label: 'Player 2',
				className: 'primary',
				callback: (popup) => {
					popup.close();
				},
			},
		]);
	}
}

function countPlayersByRole(role: string): number {
	let count = 0;
	const players = WA.players.list();
	for (const player of players) {
		if (player.state.role === role) {
			count++;
		}
	}
	return count;
}

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function closePopup() {
	if (currentPopup !== undefined) {
		currentPopup.close();
		currentPopup = undefined;
	}
}

function showInitialPopup(timeleft) {
	return WA.ui.openPopup('before', `You have ${timeleft} seconds left`, []);
}

export {};
