import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Game } from "./game.model";

@Injectable({
	providedIn: "root"
})
export class GameMockClient {

	private readonly dataURL = "assets/game.mock-data.json";

	constructor(
		private http: HttpClient
	) {
	}

	getAll$(): Observable<Game[]> {
		return this.http.get<Game[]>(this.dataURL);
	}
}
