import { createPetitionDB } from "../../prisma/queries/CREATE/petition";
import { createFriendshipDB } from "../../prisma/queries/CREATE/friendship";
import { deleteFriendshipDB } from "../../prisma/queries/DELETE/friendship";
import { selectPetitionDB } from "../../prisma/queries/SELECT/petition";
import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import { deletePetitionDB } from "../../prisma/queries/DELETE/petition";

// Al ir a http://localhost:3000/api/manage_friends te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const user = await selectPlayerDB(message.username);

	// checks the autenticity
	if (user != undefined) {
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash

			const targetUser = await selectPlayerDB(message.targetUser);

			if (targetUser != undefined) {
				if (message.type == "add") {
					// Send petition to targetUser
					const petition = await selectPetitionDB(
						message.targetUser,
						message.username
					);
					if (petition == undefined) {
						// no petition from targetUser -> creates a petition
						await createPetitionDB(
							message.username,
							message.targetUser
						);
					} else {
						// petition from targetUser -> creates a friendship
						await createFriendshipDB(
							message.username,
							message.targetUser
						);
						await deletePetitionDB(
							message.targetUser,
							message.username
						);
					}
				} else if (message.type == "delete") {
					//Delete from friends
					await deleteFriendshipDB(
						message.username,
						message.targetUser
					);
					await deleteFriendshipDB(
						message.targetUser,
						message.username
					);
				}
			}
			res.status(200).json({
				result: "success",
				reason: "",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
