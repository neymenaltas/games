import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-sidebar-content",
	templateUrl: "./sidebar-content.component.html",
	styleUrls: ["./sidebar-content.component.scss"]
})
export class SidebarContentComponent {
	@Output() sidenav: EventEmitter<any> = new EventEmitter();

	toggle() {
		this.sidenav.emit();
	}

}
