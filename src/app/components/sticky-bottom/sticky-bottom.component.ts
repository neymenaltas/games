import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { GamesState } from "../../shared/store/games.state";
import { Observable } from "rxjs";
import { Game } from "../../shared";
import { GetGames, GetLastPlayedGames } from "../../shared/store/games.actions";

@Component({
	selector: "app-sticky-bottom",
	templateUrl: "./sticky-bottom.component.html",
	styleUrls: ["./sticky-bottom.component.scss"]
})
export class StickyBottomComponent implements OnInit {

	@Select(GamesState.getLastPlayedGamesList) gamesData$: Observable<Game[]> | undefined;

	isOpened = false;
	games: Game[] = [];

	constructor(private store: Store) { }

	ngOnInit(): void {
		this.store.dispatch(new GetLastPlayedGames());

		this.gamesData$?.subscribe(games => {
			this.games = games;
		});
	}

	toggle() {
		this.isOpened = !this.isOpened;
	}
}
