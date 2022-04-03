
import { selectFriendshipDB } from "../../prisma/queries/SELECT/friendship";

export async function selectFriends(username) {
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