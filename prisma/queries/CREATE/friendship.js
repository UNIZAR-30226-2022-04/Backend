import prisma from "../../../lib/prisma";

export async function createFriendshipDB(usernm, friendnm) {
	const query = await prisma.friendship.create({
		data: {
			username: usernm,
			friendname: friendnm,
		},
	});
	return query;
}
