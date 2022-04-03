import prisma from "../../../lib/prisma";

export async function deleteFriendshipDB(username, friendname) {
	const query = await prisma.petition.deleteMany({
		where: {
			username: username,
			friendname: friendname,
		},
	});
	return query;
}
