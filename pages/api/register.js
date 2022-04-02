import crypto from "crypto";
import { createPlayerDB } from "../../prisma/queries/CREATE/player";
import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
//import CryptoJS from "crypto-js"

// Al ir a http://localhost:3000/api/register te devuelve el siguiente json
export default async (req, res) => {
	const mensaje = req.body;

	const player = await selectPlayerDB(mensaje.username);

	// checks is the username is already taken
	if (player == undefined) {
		//const salt = crypto.randomBytes(16).toString("hex")

		const query = {
			username: mensaje.username,
			email: mensaje.email,
			//salt: salt,
			password_hash: mensaje.password,
			//password: CryptoJS.SHA512(salt + mensaje.password).toString(),
			image_ID: 0, // ID number of the default profile picture (HARDCODED)
			stars: 0, // amount of initial stars (HARDCODED)
			mooncoins: 100, // amount of initial coins (HARCODED)
		};

		const player = await createPlayerDB(query);

		// if(la introduccion ha ido bien){
		res.status(200).json({ result: "success" });
		//} else error
	} else {
		res.status(200).json({
			result: "error",
			reason: "user_already_registered",
		});
	}
};
