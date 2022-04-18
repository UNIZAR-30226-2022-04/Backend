import { selectfriendTalesDB } from "../../prisma/queries/SELECT/friendTales";
import { selectmyTalesDB } from "../../prisma/queries/SELECT/myTales";
import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/get_tales te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const myTales = await selectmyTalesDB(message.username);
			const friendTales = await selectfriendTalesDB(message.username);

			res.status(200).json({
				result: "success",
				reason: "",
				myTales: myTales,
				friendTales: friendTales,
				publicTales: [],
				talesForVote: [],
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};