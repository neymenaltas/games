import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { Game } from "../../shared";
import { Select, Store } from "@ngxs/store";
import { GamesState } from "../../shared/store/games.state";
import { GetTrendingGames } from "../../shared/store/games.actions";
import { takeUntil } from "rxjs/operators";

const NAME_KEBAB = "app-home";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	host: { class: NAME_KEBAB },
})
export class HomeComponent implements OnInit, OnDestroy {

	@Select(GamesState.getTrendingGamesList) gamesData$: Observable<Game[]> | undefined;

	games: Game[] = [];
	_endSubscriptions$: Subject<boolean> = new Subject();

	constructor(private store: Store) {

	}

	ngOnInit() {
		this.store.dispatch(new GetTrendingGames());

		this.gamesData$?.pipe(
			takeUntil(this._endSubscriptions$)
		).subscribe(games => {
			this.games = games;
		});
	}

	ngOnDestroy() {
		this._endSubscriptions$.next(true);
		this._endSubscriptions$.complete();
	}
}
