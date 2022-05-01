import { selectALLStoriesDB } from "../../prisma/queries/SELECT/pruebaDev_stories";

// Al ir a http://localhost:3000/api/users te devuelve el siguiente json
export default async (req, res) => {
	const query = await selectALLStoriesDB();
	var stories = []
	for (const st in query){
		var title
		var type
		var store = true
		if (query[st].story.quick_match.length != 0){
			title = ''
			type = query[st].story.quick_match[0].mode
		} else if (query[st].story.tale.length != 0){
			const tale = query[st].story.tale[0]
			title = tale.title
			store = tale.finished
			type = 'tale'
		}
		if (store){
			const [month, day, year]       = [query[st].story.date.getUTCMonth(), query[st].story.date.getUTCDate(), query[st].story.date.getUTCFullYear()];

			const story = {
				id: query[st].story.story_id,
				title: title,
				type: type,
				date: day + "/" + month + "/" + year
			}
			stories.push(story)
		}
	}
	res.status(200).json({ result: "success", stories: stories, reason: "" });
};
