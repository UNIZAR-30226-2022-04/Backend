import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import { selectFriendshipDB } from "../../prisma/queries/SELECT/friendship";
import users from "../../lib/users";

function comparePoints(user1, user2) {
	if (user1.stars < user2.stars) return 1;
	if (user1.stars < user2.stars) return -1;
	return 0;
}

async function selectFriends(username) {
	var friends = [];
	let data = await selectFriendshipDB(username);
	friends.push(username);
	for (const row in data) {
		if (data[row].username == username) {
			friends.push(data[row].friendname);
		} else {
			friends.push(data[row].username);
		}
	}
	return friends;
}

// Al ir a http://localhost:3000/api/home te devuelve el siguiente json
export default async (req, res) => {
	const message = req.body;

	const user = await selectPlayerDB(message.username);

	// checks the autenticity
	if (user != undefined) {
		if (user.password_hash == message.password) {
			//cambiar por password + anadir mecanismo hash
			var ranking = [];
			// looks for the top N players within the friends set
			ranking = await selectFriends(message.username);
			//ranking.sort(comparePoints);

			const bestFour = [
				// top 4 friends with the higest score
				//{ username: ranking[0].username, stars: ranking[0].stars },
				//{ username: ranking[1].username, stars: ranking[1].stars },
				//{ username: ranking[2].username, stars: ranking[2].stars },
				//{ username: ranking[3].username, stars: ranking[3].stars },
			];

			for (var i = 0; i < ranking.length && i < 4; i++) {
				const u = { username: ranking[i], stars: 0 };
				bestFour.push(u);
			}

			const notifications = 2; // sustituir por inferior cuando se puedan mandar notificaciones
			//const notifications = user.receiver.length; // amount of notifications
			res.status(200).json({
				result: "success",
				picture: user.image_ID,
				stars: user.stars,
				coins: user.mooncoins,
				bestFour,
				notifications,
				reason: "",
			});
		} else {
			res.status(200).json({ result: "error", reason: "wrong_password" });
		}
	} else {
		res.status(200).json({ result: "error", reason: "user_not_found" });
	}
};
