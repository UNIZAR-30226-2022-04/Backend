import { selectfriendTalesDB } from "../../../prisma/queries/SELECT/friendTales";
import { selectmyTalesDB } from "../../../prisma/queries/SELECT/myTales";
import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { selectpublicTalesDB } from "../../../prisma/queries/SELECT/publicTales";
import { selecttalesForVoteDB } from "../../../prisma/queries/SELECT/talesForVote";
import { checkFields } from "../../../lib/checkFields";

export default async (req, res) => {
	const message = req.body;

	const fields = ["username", "password"];

	const rest = checkFields(message,fields)
	if (rest.length != 0){
		const msg = "invalid credentials, expected: " + rest
		res.status(200).json({ result: "error", reason: msg });
		return;
	}

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const myTales = await selectmyTalesDB(message.username);
			const friendTales = await selectfriendTalesDB(message.username);
			const publicTales = await selectpublicTalesDB(message.username);
			const talesForVote = await selecttalesForVoteDB(message.username);

			res.status(200).json({
				result: "success",
				reason: "",
				myTales: myTales,
				friendTales: friendTales,
				publicTales: publicTales,
				talesForVote: talesForVote,
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
