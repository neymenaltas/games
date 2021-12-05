import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

const MODULES = [
	MatFormFieldModule,
	MatSelectModule,
	MatSidenavModule,
	MatButtonModule,
	MatIconModule
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		...MODULES
	],
	exports: [
		...MODULES
	],
})
export class MaterialModule { }
