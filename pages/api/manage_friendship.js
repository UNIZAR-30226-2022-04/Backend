import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/manage_friends te devuelve el siguiente json
export default async (req, res) => {
	const mensaje = req.body;

	const user = await selectPlayerDB(mensaje.username);

	// checks the autenticity
	if (user != undefined) {
		if (user.password_hash == mensaje.password) {
			//cambiar por password + anadir mecanismo hash

			const targetUser = await selectPlayerDB(mensaje.targetUser);

			if (targetUser != undefined) {
				if (mensaje.type == "add") {
					// TODO MAKE FRIENDSHIP PETITION HERE
				} else if (mensaje.type == "delete") {
					// TODO DELETE FRIENDSHIP PETITION HERE
				}
			}
			res.status(200).json({ result: "success" });
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
