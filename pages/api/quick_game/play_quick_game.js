import { addPlayerGame, createGame, findGame } from "../../../lib/Game";
import Player from "../../../lib/Player";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/quick_game/play_quick_game te devuelve el siguiente json
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
			const game = findGame(message.id);

			if (game == undefined) {
				res.status(200).json({
					result: "error",
					reason: "room_not_found",
				});
				return;
			}

			if (game.turn == 0) game.nextTurn();

			const result =
				message.turn <= game.turn
					? "success"
					: "waiting_players";


			var lastParagraph = "";
			var puneta = "";

			if (result == "success" && game.turn != 1){
				lastParagraph = game.getLastParagraph(message.username);
				puneta = game.getPuneta(message.username)
			}

			res.status(200).json({
				result: result,
				s: game.maxTime,
				//s: game.timeRemaining,
				topic: game.topic,
				randomWords: game.randomWords,
				lastParagraph: lastParagraph,
				isLast: game.turn == game.players.length,
				puneta: puneta,
				turn: game.turn
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
