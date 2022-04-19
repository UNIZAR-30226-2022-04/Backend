import { updateParagraphDB } from "../../prisma/queries/PUT/paragraph";
import { updateParticipantDB } from "../../prisma/queries/PUT/participant";
import { selectParagraphsDB } from "../../prisma/queries/SELECT/paragraphs";
import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/vote_story te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const paragraphs = await selectParagraphsDB(message.id);
			const paraOwner = paragraphs[message.indexParagraph];

			await updateParticipantDB(message.username, message.id, paraOwner);

			await updateParagraphDB(message.id, message.indexParagraph);
			res.status(200).json({
				result: "success",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
