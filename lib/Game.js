import { gamesList } from "./GamesManager";
import { getTrends } from "./TrendsManager";
import { randomWordsList } from "./GamesManager";
import { state } from "./GamesManager";

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

	// Devuelve el parrafo a continuar
	// NO TOCAR, si falla comentadla, que sera
	// algun fallo tonto casi seguro, no la pruebo
	// ahora porque es tarde, pero seguire con ella
	// para probar y (muy seguramente) arreglarla en
	// cuanto pueda.
	// Basicamente sirve para no repetir historias, ni
	// tuyas ni de otros, y para repetir predecesores/sucesores
	// la menor cantidad posible en general. Hay otra
	// implementación posible en caso de que la cantidad
	// de participantes+1 sea numero primo pero obviamente
	// no funciona para todos los casos y, ademas,
	// costaria mas tiempo de ejecucion a lo tonto
	// (si quereis, tambien la tengo por ahi)
	getLastParagraph(player) {
		const pl = this.players.find((p) => p.username == player.username);
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
			return parag[parag.length - 1].body;
		} else return "";
	}

	addParagraph(player,paragraph){

		var a = this.turn / 2;
		var s = 1;
		if (this.turn % 2 != 0) {
			a = (this.turn - 1) / 2;
			s = -1;
		}
		const myIndex = this.players.indexOf(player);
		const plIndex =
			(a * (this.players.length + s) + myIndex) % this.players.length;

		this.paragraphs++
		this.players[plIndex].addPlayerParagraph(paragraph)
		if (this.paragraphs == this.players.length) this.nextTurn()
	}

	nextTurn() {
		if (this.state == state.LOBBY){
			this.state = state.INGAME;
		} else if (this.turn == players.length){
			this.state = state.VOTING;
		}
		this.paragraphs = 0;
		this.turn++;
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
	const game = gamesList.find((game) => game.players.find((player) => player.username == host.username) != undefined);
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

export function addPlayerGame(room_id, player) {
	const inGame = gamesList.find((game) => game.players.find((player) => player.username == player.username) != undefined);
	const game = gamesList.find((game) => game.room_id == room_id);
	if (inGame != undefined && inGame.room_id == room_id && game.state == state.LOBBY){
		const inGame = game.players.find((p) => p.username == player.username);
		if (inGame == undefined ) {
			game.addPlayer(player);
		}
		return true;
	} else { return false; }
}

export function findGame(room_id) {
	const game = gamesList.find((game) => game.room_id == room_id);
	return game;
}
