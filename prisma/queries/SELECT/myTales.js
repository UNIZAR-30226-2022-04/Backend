import prisma from "../../../lib/prisma";
import { selectTaleDB } from "./tale_mode";

export async function selectmyTalesDB(username) {
	const query = await prisma.paragraph.findMany({
		where: {
			AND: [
				{
					username: {
						equals: username,
					},
				},
				{
					turn_number: {
						equals: 0,
					},
				},
			],
		},
	});

	const myTalesId = [];
	query.forEach((paragraph) => myTalesId.push(paragraph.story_id));

	const myTales = await prisma.tale_mode.findMany({
		where: {
			story_id: { in: myTalesId },
		},
	});

	myTales.forEach((tale) => (tale.creator = username));

	return myTales;
}
