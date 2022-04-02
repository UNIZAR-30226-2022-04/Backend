import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

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

				const isFriend = true;
				//const isFriend = (user.friends.find(user =>
				//            user.username == targetUser.username) != null)

				res.status(200).json({
					result: "success",
					isFound: true,
					picture,
					isFriend,
				});
			} else {
				res.status(200).json({ result: "success", isFound: false });
			}
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
