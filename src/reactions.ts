export function playSoundOnChatCommand() {
	let lastSound = '';
	let lastSoundTime = 0;
	const reactionDelay = 3000;

	WA.chat.open();
	WA.chat.sendChatMessage("Tapez '/applause' ou '/booing' dans le chat !");
	WA.chat.onChatMessage((message) => {
		const currentTime = Date.now();
		const messageLower = message.toLowerCase();
		const timestamp = Date.now();

		if (WA.player.state.role === 'audience') {
			if (
				(messageLower === '/applause' || messageLower === '/booing') &&
				currentTime - lastSoundTime <= reactionDelay
			) {
				WA.state.saveVariable('soundState', `combined-${timestamp}`);
			} else {
				if (messageLower === '/applause') {
					WA.state.saveVariable('soundState', `applause-${timestamp}`);
				} else if (messageLower === '/booing') {
					WA.state.saveVariable('soundState', `booing-${timestamp}`);
				}

				lastSound = messageLower;
			}
		}
		lastSoundTime = currentTime;
	});

	const applause = WA.sound.loadSound('reactions/clap-clap.ogg');
	const booing = WA.sound.loadSound('reactions/booing.ogg');
	const combinedSound = WA.sound.loadSound('reactions/applause-and-boo.ogg');

	const soundConfig = {
		volume: 0.5,
		loop: false,
		rate: 1,
		detune: 1,
		delay: 0,
		seek: 0,
		mute: false,
	};
	WA.state.onVariableChange('soundState').subscribe((newState) => {
		const stateValue = newState as string;
		const [soundType] = stateValue.split('-');
		if (soundType === 'applause') {
			applause.play(soundConfig);
		} else if (soundType === 'booing') {
			booing.play(soundConfig);
		} else if (soundType === 'combined') {
			combinedSound.play(soundConfig);
		}
	});
}
export {};
