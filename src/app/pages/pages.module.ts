import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";

import { AppPagesRoutingModule } from "./pages-routing.module";
import { GamesComponent } from "./games/games.component";
import { GameCardComponent } from "../components/game-card/game-card.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GameDetailComponent } from "./game-detail/game-detail.component";
import { MaterialModule } from "../shared/modules/material/material.module";

const COMPONENTS = [
	HomeComponent,
	GamesComponent,
	GameCardComponent,
	GameDetailComponent,
];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	declarations: [
		...COMPONENTS,
	],
	exports: [
		...COMPONENTS
	]
})
export class AppPagesModule {

}
