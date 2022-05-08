export default class Player {
	constructor(username, password, picture, stars, mooncoins) {
		this.username = username;
		this.password = password;
		this.picture = picture;
		this.stars = stars;
		this.mooncoins = mooncoins;
		this.paragraphs = [];
		this.votedTo = 0
	}

	addPlayerParagraph(paragraph) {
		this.paragraphs.push(paragraph);
	}

	friends() {
		return 0;
		//return getFriends(this.username);
	}
}
