import prisma from "../../../lib/prisma";

export async function deleteFriendshipDB(username, friendname) {
	const query = await prisma.petition.deleteMany({
		where: {
			username: username,
			petition_name: friendname,
		},
	});
	return query;
}
