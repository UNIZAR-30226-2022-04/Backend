import { gamesList } from "./GamesManager";
import { getTrends } from "./TrendsManager";
import { selectPlayerDB } from "../prisma/queries/SELECT/player";
import { updatePlayerDB } from "../prisma/queries/PUT/player";
import { randomWordsList } from "./GamesManager";
import { state } from "./GamesManager";

const REVES_PRICE = 15;
const CIEGO_PRICE = 30;
const DESORDEN_PRICE = 50;

export default class Game {
	constructor(
		room_id,
		host,
		time,
		isPrivate,
		mode,
		state,
		maxTime,
		topic,
		randomWords
	) {
		this.room_id = room_id;
		this.host = host;
		this.time = time;
		this.isPrivate = isPrivate;
		this.mode = mode; //random / twitter
		this.state = state;
		this.maxTime = maxTime;
		//this.timeRemaining = maxTime
		this.turn = 0;
		this.voteTurn = 0;
		this.paragraphs = 0;
		//this.haveFinished = 0;
		this.topic = topic;
		this.randomWords = randomWords;
		this.players = [];
		this.addPlayer(host);
	}

	addPlayer(player) {
		this.players.push(player);
	}

	deletePlayer(player) {
		const pl = this.players.find((p) => p.username == player.username);
		this.players.splice(this.players.indexOf(pl));
		//this.players = this.players.filter((p) => (p = player));
	}

	async addPunetas(senderUsername,punetas){
		var spent = 0;
		punetas.forEach((pun) => {
			const pl = this.players.find((p) => p.username == pun.username);
			const cost = REVES_PRICE;
			if (pun.puneta=="ciego") cost = CIEGO_PRICE;
			else if (pun.puneta=="desorden") cost = DESORDEN_PRICE;
			if (pl.punetaCost<cost) {
				spent+=pl.punetaCost-cost;
				pl.nextPuneta = pun.puneta;
			}
		});
		const sender = await selectPlayerDB(senderUsername);
		sender.mooncoins = sender.mooncoins-spent;
		await updatePlayerDB(sender.username, sender);
	}

	getPuneta(username) {
		const pl = this.players.find((p) => p.username == username);
		console.log(this);
		if (pl != undefined && this.turn != 1) {
			return this.players[this.players.indexOf(pl)].puneta;
		}
	}

	getLastParagraph(username) {
		const pl = this.players.find((p) => p.username == username);
		console.log(this);
		if (pl != undefined && this.turn != 1) {
			var a = this.turn / 2;
			var s = 1;
			if (this.turn % 2 != 0) {
				a = (this.turn - 1) / 2;
				s = -1;
			}
			const myIndex = this.players.indexOf(pl);
			const plIndex =
				(a * (this.players.length + s) + myIndex) % this.players.length;
			const parag = this.players[plIndex].paragraphs;
			console.log(myIndex);
			console.log(plIndex);
			console.log(parag);
			console.log(parag[parag.length - 1]);
			console.log(parag[parag.length - 1].body);
			return parag[parag.length - 1].body;
		} else return "";
	}

	addParagraph(player, paragraph) {
		var a = this.turn / 2;
		var s = 1;
		if (this.turn % 2 != 0) {
			a = (this.turn - 1) / 2;
			s = -1;
		}
		const myIndex = this.players.indexOf(player);
		const plIndex =
			(a * (this.players.length + s) + myIndex) % this.players.length;

		this.paragraphs++;
		this.players[plIndex].addPlayerParagraph(paragraph);
		if (this.paragraphs == this.players.length) this.nextTurn();
	}

	nextTurn() {
		if (this.state == state.LOBBY) {
			this.turn++;
			this.state = state.INGAME;
		} else if (this.turn == this.players.length) {
			this.state = state.VOTING;
			this.voteTurn++
		} else {
			this.paragraphs = 0;
			this.players.forEach((pl) => {
				pl.puneta = pl.nextPuneta;
				pl.nextPuneta = "";
			});
			this.turn++;
		}
		
		// inicializar tiempo
	}
}

export async function createGame(
	room_id,
	host,
	time,
	isPrivate,
	mode,
	state,
	maxTime
) {
	const game = gamesList.find(
		(game) =>
			game.players.find((player) => player.username == host.username) !=
			undefined
	);
	if (game != undefined) {
		// devuelve que ya está en partida
		return false;
	}
	const randomWords = [];
	const topics = [];

	if (mode == "random") {
		var random1 =
			randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

		var random2 =
			randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

		while (random2 == random1) {
			random2 =
				randomWordsList[
					Math.floor(Math.random() * randomWordsList.length)
				];
		}

		var random3 =
			randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

		while (random3 == random1 || random3 == random2) {
			random3 =
				randomWordsList[
					Math.floor(Math.random() * randomWordsList.length)
				];
		}

		randomWords.push(random1);
		randomWords.push(random2);
		randomWords.push(random3);
	} else if (mode == "twitter") {
		const query = await getTrends();
		const trends = query[0].trends;
		trends.forEach((trend) => {
			topics.push(trend.name);
		});
		var topic = topics[Math.floor(Math.random() * topics.length)];
	}

	gamesList.push(
		new Game(
			room_id,
			host,
			time,
			isPrivate,
			mode,
			state,
			maxTime,
			topic,
			randomWords
		)
	);

	return true;
}

export function addPlayerGame(room_id, p) {
	const inGame = gamesList.find(
		(game) =>
			game.players.find((player) => player.username == p.username) !=
			undefined
	);
	console.log(inGame);
	const game = gamesList.find((game) => game.room_id == room_id);
	console.log(game);
	if (
		(inGame == undefined && game.state == state.LOBBY) || // Si no esta en otra partida y me quiero unir a una partida en loby
		(inGame != undefined && inGame.room_id == room_id) // Si esta ya en esta partida
	) {
		if (inGame == undefined) {
			// Si es nuevo
			game.addPlayer(p);
		}
		return true;
	} else {
		return false;
	}
}

export function findGame(room_id) {
	const game = gamesList.find((game) => game.room_id == room_id);
	return game;
}
