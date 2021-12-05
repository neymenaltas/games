import { Component, OnDestroy, OnInit } from "@angular/core";
import { GamesState } from "../../shared/store/games.state";
import { forkJoin, Observable, Subject } from "rxjs";
import { Game } from "../../shared";
import { Select, Store } from "@ngxs/store";
import { ChangeSearchTerm, GetGames } from "../../shared/store/games.actions";
import { debounceTime, distinctUntilChanged, takeUntil, withLatestFrom } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MatOptionSelectionChange } from "@angular/material/core";

@Component({
	selector: "app-games",
	templateUrl: "./games.component.html",
	styleUrls: ["./games.component.scss"]
})
export class GamesComponent implements OnInit, OnDestroy {

	@Select(GamesState.getGamesList) gamesData$: Observable<Game[]> | undefined;
	@Select(GamesState.getSearchedResultProviders) searchedResultProviders$: Observable<string[]> | undefined;
	@Select(GamesState.getSelectedProviders) selectedProviders$: Observable<string[]> | undefined;
	@Select(GamesState.getSearchTerm) searchTerm$: Observable<string> | undefined;

	games: Game[] = [];
	searchedResultProviders: string[] = [];
	searchTerm: string | null = "";
	selectedProviders: string[] = [];
	searchTermUpdate$: Subject<string> = new Subject<string>();
	_endSubscriptions$: Subject<boolean> = new Subject();
	isProvidersChanged = false;

	formProvider = new FormControl();

	constructor(private store: Store, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.route.queryParamMap.subscribe(paramMap => {
			this.searchTerm = paramMap.get("searchTerm");
			this.selectedProviders = paramMap.getAll("selectedProviders");
			this.formProvider.setValue(this.selectedProviders);

			this.store.dispatch(new GetGames({
				searchTerm: this.searchTerm ? this.searchTerm : "",
				selectedProviders: this.selectedProviders
			}));
		});


		this.searchTermUpdate$.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe(searchTerm => {
			this.store.dispatch(new ChangeSearchTerm({searchTerm}));
			this.updateQueryParams(
				{
					searchTerm,
					selectedProviders: this.selectedProviders
				}
			);
		});

		this.gamesData$?.pipe(
			takeUntil(this._endSubscriptions$)
		).subscribe(games => {
			this.games = games;
		});

		this.searchedResultProviders$?.pipe(
			takeUntil(this._endSubscriptions$)
		).subscribe(providers => {
			this.searchedResultProviders = providers;
		});

		// @ts-ignore
		this.selectedProviders$?.pipe(withLatestFrom(this.searchedResultProviders$))
			.subscribe(([selectedProviders, searchedResultProviders]: any) => {
				if (!selectedProviders.length && searchedResultProviders?.length && !this.isProvidersChanged) {
					this.updateQueryParams(
						{
							searchTerm: this.searchTerm,
							selectedProviders: searchedResultProviders
						}
					);
				}
			});

	}


	changeSelectedProviders(event: MatOptionSelectionChange) {
		this.isProvidersChanged = true;
		if (event.source.selected) {
			if (this.selectedProviders?.length) {
				this.selectedProviders = [...this.selectedProviders, event.source.value];
			} else {
				this.selectedProviders = [event.source.value];
			}

		} else {
			this.selectedProviders = this.selectedProviders?.filter(provider => provider !== event.source.value);
		}
		this.updateQueryParams(
			{
				searchTerm: this.searchTerm,
				selectedProviders: this.selectedProviders
			}
		);
	}

	clearSelectedProviders() {
		this.isProvidersChanged = true;
		this.updateQueryParams(
			{
				searchTerm: this.searchTerm,
				selectedProviders: []
			}
		);
	}

	updateQueryParams(queryParams: { searchTerm: string | null; selectedProviders: string[]; }) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams
		});
	}

	ngOnDestroy() {
		this._endSubscriptions$.next(true);
		this._endSubscriptions$.complete();
	}

}
