import { deleteStoriesDB } from "../../prisma/queries/DELETE/pruebaDev_stories";

// Al ir a http://localhost:3000/api/users te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;
	await deleteStoriesDB(message.min,message.max);
	res.status(200).json({result: "success"});
};
