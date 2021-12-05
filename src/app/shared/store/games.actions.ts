import { Game } from "../client/game.model";

export class GetGames {
	static readonly type = "[GAME] Get Games";

	constructor(public payload: { searchTerm: string, selectedProviders: string[] }) {}
}

export class GetTrendingGames {
	static readonly type = "[GAME] Get Trending Games";

}

export class GetLastPlayedGames {
	static readonly type = "[GAME] Get Last Played Games";

}

export class AddToLastPlayedGames {
	static readonly type = "[GAME] Add To Last Played Games";

	constructor(public payload: { game: Game}) {}

}

export class GetProviders {
	static readonly type = "[GAME] Get Providers";

}

export class GetGameDetail {
	static readonly type = "[GAME] Get Game Detail";

	constructor(public payload: { slug: string }) {}
}

export class ChangeSelectedProviders {
	static readonly type = "[GAME] Change Selected Providers";

	constructor(public payload: { selectedProviders: string[] }) {}
}

export class ChangeSearchTerm {
	static readonly type = "[GAME] Change Search Term";

	constructor(public payload: { searchTerm: string }) {}
}
