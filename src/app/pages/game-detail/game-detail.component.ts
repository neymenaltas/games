import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { GamesState } from "../../shared/store/games.state";
import { Game } from "../../shared";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { AddToLastPlayedGames, GetGameDetail } from "../../shared/store/games.actions";

@Component({
	selector: "app-game-detail",
	templateUrl: "./game-detail.component.html",
	styleUrls: ["./game-detail.component.scss"]
})
export class GameDetailComponent implements OnInit, OnDestroy {

	@Select(GamesState.getGameDetail) gameDetail$: Observable<Game> | undefined;
	gameDetail: Game | undefined = undefined;
	_endSubscriptions$: Subject<boolean> = new Subject();
	slug: string | null = "";

	constructor(private store: Store, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.queryParamMap.subscribe( paramMap => {
			this.slug = paramMap.get("slug");
			if (this.slug) {
				this.store.dispatch(new GetGameDetail({slug: this.slug}));
			}
			this.gameDetail$?.pipe(
				takeUntil(this._endSubscriptions$)
			).subscribe(gameDetail => {
				this.gameDetail = gameDetail;
				if (gameDetail) {
					this.store.dispatch(new AddToLastPlayedGames({game: gameDetail}));
				}

			});
		});
	}

	ngOnDestroy() {
		this._endSubscriptions$.next(true);
		this._endSubscriptions$.complete();
	}

}
