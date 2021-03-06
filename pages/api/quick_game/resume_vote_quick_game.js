import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { BEGIN_MARGIN } from "../../../lib/GamesManager";
import { findGame, checkEmpty } from "../../../lib/Game";

export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password", "id"];

	const rest = checkFields(message, fields);
	if (rest.length != 0) {
		const msg = "invalid credentials, expected: " + rest;
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			await checkEmpty(message.id);

			// habria que poner mutex desde {
			const game = findGame(message.id);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}
			game.reviewing = false;
			const pl = game.players.find((p) => p.username == message.username);
			const result =
			(message.turn <= game.voteTurn && pl.votedTo == "" && (((Date.now()-game.initialTime+BEGIN_MARGIN)/1000)>=0))
				? "success"
				: "waiting_players";

			if (result == "waiting_players"){
				res.status(200).json({
					result: result,
					turn: game.voteTurn
				});
				return;
			}

			const paragraphs = [];

			game.players[game.voteTurn-1].paragraphs.forEach((paragraph) => {
				paragraphs.push({ body: paragraph.body, words: game.randomWords });
			});

			res.status(200).json({
				result: result,
				topic: game.topic,
				paragraphs: paragraphs,
				isLast: game.voteTurn == game.players.length,
				turn: game.voteTurn,
				s: game.getRemainingTime()
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
