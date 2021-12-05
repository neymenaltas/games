import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppPagesModule } from "./pages/pages.module";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { GamesState } from "./shared/store/games.state";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidebarContentComponent } from "./components/sidebar-content/sidebar-content.component";
import { StickyBottomComponent } from "./components/sticky-bottom/sticky-bottom.component";
import { MaterialModule } from "./shared/modules/material/material.module";

@NgModule({
	declarations: [
		AppComponent,
		SidebarContentComponent,
		StickyBottomComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		BrowserModule,
		AppPagesModule,
		NgxsModule.forRoot([
			GamesState
		]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsLoggerPluginModule.forRoot(),
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [],
	exports: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
