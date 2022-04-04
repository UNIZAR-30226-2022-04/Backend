import prisma from "../../../lib/prisma";

export async function deleteFriendshipDB(username, friendname) {
	const query = await prisma.friendship.deleteMany({
		where: {
			AND: [
				{ username: { equals: username } },
				{ friendname: { equals: friendname } },
			],
		},
	});

	console.log(query)
	console.log(username)
	console.log(friendname)
	return query;
}
