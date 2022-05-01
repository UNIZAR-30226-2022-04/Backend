import prisma from "../../../lib/prisma";

export async function selectALLStoriesDB() {
	const query = await prisma.participant.findMany({
		where: {
		},
        select: {
            story: {
                select: {
                    story_id: true,
                    date: true,
                    tale: true,
                    quick_match: {
                        select: {
                            mode: true,
                        },
                    },
                },
            },
        },
	});
	return query;
}
