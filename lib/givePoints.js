import { selectPlayerDB } from "../prisma/queries/SELECT/player";
import { updatePlayerDB } from "../prisma/queries/PUT/player";

export async function givePoints(paragraph,privacy){
    var multiplier = 300;
    if (privacy) multiplier = 200;
		const player = await selectPlayerDB(paragraph.username);
    player.mooncoins += parseInt(multiplier);
    player.stars += parseInt(multiplier);
    await updatePlayerDB(player.username,player);
}