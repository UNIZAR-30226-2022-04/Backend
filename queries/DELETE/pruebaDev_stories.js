import prisma from "../../../lib/prisma";

export async function deleteStoriesDB(min,max) {
	await prisma.story.deleteMany({
		where: {
            AND: [/*
                {   
                OR: [
                        {
                        tale: { 
                            some:{
                                AND: [
                                    {scored: false},
                                    {finished: true},
                                ]},
                            },
                        },
                        {
                        quick_match: { 
                            some:{
                                AND: [
                                    {NOT: [{mode: undefined}]},
                                ]},
                            },
                        },
                    ]
                },*/
                {
                    story_id: {
                        lte: max,
                    },
                },
                {
                    story_id: {
                        gte: min,
                    },
                },
			],
        },
	});
    await prisma.tale_mode.deleteMany({
		where: {
            AND: [
                {scored: false},
                {finished: true},
            ]
        },
	});
}
