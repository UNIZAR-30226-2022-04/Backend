import { selectPlayerDB } from "../../../prisma/queries/SELECT/player";
import { selectStoriesDB } from "../../../prisma/queries/SELECT/stories";
import {checkFields} from "../../../lib/checkFields";

// Al ir a http://localhost:3000/api/get_stories te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	
	const fields = ['username','password'];

	if (!checkFields(message,fields)){
		res.status(200).json({ result: "error", reason: "invalid credentials" });
		return;
	}

	const user = await selectPlayerDB(message.username);

	if (message.username.length==0||message.password.length==0){
		res.status(200).json({ result: "error", reason: "invalid credentials" });
	}

	// checks if the requested user exists
	if (user != undefined) {
		// checks password
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
            const stories = selectStoriesDB(message.username);
			res.status(200).json({ result: "success", stories, reason: "" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};