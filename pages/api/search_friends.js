import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import {selectFriends} from "../../lib/Friendships";

// Al ir a http://localhost:3000/api/search_friends te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const user = await selectPlayerDB(message.username);

	// checks the autenticity
	if (user != undefined) {
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash

			const targetUser = await selectPlayerDB(message.searchedName);

			if (targetUser != undefined) {
				const picture = targetUser.image_ID;

				const friends = selectFriends(message.username);
				const friend = friends.find(user => 
					user.username == targetUser.username)
				const isFriend = (friend != null);

				res.status(200).json({
					result: "success",
					reason: "",
					isFound: true,
					picture,
					isFriend,
				});
			} else {
				res.status(200).json({
					result: "success",
					reason: "",
					isFound: false,
				});
			}
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
