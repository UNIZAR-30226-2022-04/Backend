import prisma from "../../../lib/prisma";

export async function createPetitionDB(questioner, receiver) {
	const data = {
		username: questioner,
		petition_name: receiver,
	}
	const query = await prisma.petition.create({data: data});
	return query;
}
