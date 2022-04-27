import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { checkFields } from "../../../lib/checkFields";
import { gamesList } from "../../../lib/GamesManager";

// Al ir a http://localhost:3000/api/quick_game/get_room te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password"];

	if (!checkFields(message, fields)) {
		res.status(200).json({
			result: "error",
			reason: "invalid credentials",
		});
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			res.status(200).json({
				result: "success",
				games: gamesList,
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
