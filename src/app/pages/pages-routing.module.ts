import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { GamesComponent } from "./games/games.component";
import { GameDetailComponent } from "./game-detail/game-detail.component";

const ROUTES: Routes = [
	{ path: "games/:slug", component: GameDetailComponent },
	{ path: "games", component: GamesComponent },
	{ path: "", component: HomeComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES, {
		// enableTracing: true
	})],
	exports: [RouterModule],
})
export class AppPagesRoutingModule {

}
