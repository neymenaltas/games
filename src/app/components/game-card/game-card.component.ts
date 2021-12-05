import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Game } from "../../shared";

@Component({
	selector: "app-game-card",
	templateUrl: "./game-card.component.html",
	styleUrls: ["./game-card.component.scss"]
})
export class GameCardComponent {
	@Input() game: Game = {	id: 1, slug: "", title: "", providerName: "", startUrl: ""};
}
