import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Game } from "../client/game.model";
import { GameMockClient } from "../client/game-mock.client";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
	AddToLastPlayedGames,
	ChangeSearchTerm,
	ChangeSelectedProviders,
	GetGameDetail,
	GetGames,
	GetLastPlayedGames,
	GetTrendingGames
} from "./games.actions";

interface GamesStateModel {
	games: Game[];
	trendingGames: Game[];
	gameDetail: Game | undefined;
	searchedResultProviders: string[];
	selectedProviders: string[];
	searchTerm: string;
	lastPlayedGames: Game[];
}

@State<GamesStateModel>({
	name: "games",
	defaults: {
		games: [],
		trendingGames: [],
		gameDetail: undefined,
		searchedResultProviders: [],
		selectedProviders: [],
		searchTerm: "",
		lastPlayedGames: []
	}
})
@Injectable()
export class GamesState {

	constructor(private gamesService: GameMockClient) {
	}

	@Selector()
	static getGamesList(state: GamesStateModel): Game[] {
		return state.games;
	}

	@Selector()
	static getSearchedResultProviders(state: GamesStateModel): string[] {
		return state.searchedResultProviders;
	}

	@Selector()
	static getTrendingGamesList(state: GamesStateModel): Game[] {
		return state.trendingGames;
	}

	@Selector()
	static getGameDetail(state: GamesStateModel): Game | undefined {
		return state.gameDetail;
	}

	@Selector()
	static getSelectedProviders(state: GamesStateModel): string[] {
		return state.selectedProviders;
	}

	@Selector()
	static getSearchTerm(state: GamesStateModel): string {
		return state.searchTerm;
	}

	@Selector()
	static getLastPlayedGamesList(state: GamesStateModel): Game[] {
		return state.lastPlayedGames;
	}

	@Action(GetGames)
	getGames({getState, setState}: StateContext<GamesStateModel>, {payload}: GetGames) {
		return this.gamesService.getAll$().pipe(tap(result => {
			let games: Game[] = result;
			let searchedResultProviders : string[] = [];
			if (payload.searchTerm) {
				games = result.filter(res => res.title.toLowerCase().includes(payload.searchTerm.toLowerCase()));
			}

			searchedResultProviders = [...new Set(games.map(game => game.providerName))];

			games = games.filter(res => payload.selectedProviders?.includes(res.providerName));

			const state = getState();
			setState({
				...state,
				games,
				searchTerm: payload.searchTerm,
				searchedResultProviders,
				selectedProviders: payload.selectedProviders
			});
		}));
	}

	@Action(GetTrendingGames)
	getTrendingGames({getState, setState}: StateContext<GamesStateModel>) {
		return this.gamesService.getAll$().pipe(tap(result => {
			const state = getState();
			setState({
				...state,
				trendingGames: result.filter(res => res.tag === "trending"),
			});
		}));
	}

	@Action(GetLastPlayedGames)
	getLastPlayedGames({getState, setState}: StateContext<GamesStateModel>) {
		const lastPlayedGames: Game[] = localStorage.getItem("lastPlayedGames")
			? JSON.parse(localStorage.getItem("lastPlayedGames") as string)
			: [];
		const state = getState();
		setState({
			...state,
			lastPlayedGames,
		});
	}

	@Action(AddToLastPlayedGames)
	addToLastPlayedGames({getState, setState}: StateContext<GamesStateModel>, {payload}: AddToLastPlayedGames ) {
		let lastPlayedGames: Game[] = [];


		if (localStorage.getItem("lastPlayedGames")) {
			lastPlayedGames = JSON.parse(localStorage.getItem("lastPlayedGames") as string);
		}


		lastPlayedGames?.forEach(game => {
			if (game?.id === payload.game?.id) {
				lastPlayedGames = lastPlayedGames?.filter(playedGame => playedGame?.id !== game?.id);
			}
		});

		lastPlayedGames.unshift(payload.game);

		if (lastPlayedGames?.length > 5) {
			lastPlayedGames = lastPlayedGames.slice(0, 5);
		}


		localStorage.setItem("lastPlayedGames", JSON.stringify(lastPlayedGames));

		const state = getState();
		setState({
			...state,
			lastPlayedGames,
		});
	}

	@Action(ChangeSelectedProviders)
	changeSelectedProviders({getState, setState}: StateContext<GamesStateModel>, {payload}: ChangeSelectedProviders) {
		const state = getState();
		setState({
			...state,
			selectedProviders: payload.selectedProviders
		});
	}

	@Action(ChangeSearchTerm)
	changeSearchTerm({getState, setState}: StateContext<GamesStateModel>, {payload}: ChangeSearchTerm) {
		const state = getState();
		setState({
			...state,
			searchTerm: payload.searchTerm
		});
	}

	@Action(GetGameDetail)
	getGameDetail({getState, setState}: StateContext<GamesStateModel>, {payload}: GetGameDetail) {
		return this.gamesService.getAll$().pipe(tap(result => {
			const state = getState();
			setState({
				...state,
				gameDetail: result.find(res => res.slug === payload.slug),
			});
		}));
	}
}
