import { createParagraphDB } from "../../prisma/queries/CREATE/paragraph";
import { updateTaleDB } from "../../prisma/queries/PUT/tale_mode";
import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import { selectTaleDB } from "../../prisma/queries/SELECT/tale_mode";

// Al ir a http://localhost:3000/api/add_tale_paragraph te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const user = await selectPlayerDB(message.username);

	// checks if username exists
	if (user != undefined) {
		if (user.password_hash == message.password) {
			const tale = await selectTaleDB(message.id);

			const dataParagraph = {
				text: message.body,
				username: message.username,
				story_id: message.id,
				turn_number: tale.turn + 1,
			};

			await createParagraphDB(dataParagraph);

			if (message.isLast) {
				const dataTale = {
					story_id: tale.story_id,
					max_turns: tale.maxTurns,
					turn: tale.turn + 1,
					max_paragraph_chars: tale.maxCharacters,
					privacy: tale.privacy,
					title: tale.title,
					finished: true,
				};
				await updateTaleDB(message.id, dataTale);
			} else {
				const dataTale = {
					story_id: tale.story_id,
					max_turns: tale.maxTurns,
					turn: tale.turn + 1,
					max_paragraph_chars: tale.maxCharacters,
					privacy: tale.privacy,
					title: tale.title,
					finished: false,
				};
				await updateTaleDB(message.id, dataTale);
			}

			res.status(200).json({ result: "success", reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};