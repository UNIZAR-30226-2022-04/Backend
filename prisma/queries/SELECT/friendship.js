import prisma from "../../../lib/prisma";

export async function selectFriendshipDB(username) {
	const query = await prisma.friendship.findMany({
		where: {
			OR: [
				{ username: { equals: username } },
				{ friendname: { equals: username } },
			],
		},
	});

	return query;
}
