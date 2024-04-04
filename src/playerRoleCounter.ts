export async function countPlayerRoles() {
    let currentComedian = 0;
    let currentAudience = 0;

    await WA.players.configureTracking({
        players: true,
        movement: true,
    });

    const players = WA.players.list();

    for (const player of players) {
        if(player.state.role === "comedian"){
            currentComedian++;
        }
        else if(player.state.role === "audience"){
            currentAudience++;
        }
    }

    WA.players.onPlayerEnters.subscribe((player) => {
        if(player.state.role === "comedian"){
            currentComedian++;
        }
        else if(player.state.role === "audience"){
            currentAudience++;
        }
    });

    WA.players.onPlayerLeaves.subscribe((player) => {
        if(player.state.role === "comedian"){
            currentComedian--;
        }
        else if(player.state.role === "audience"){
            currentAudience--;
        }
    });

    return { currentComedian, currentAudience };
}