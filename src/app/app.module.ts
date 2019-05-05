import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {LoginComponent} from "~/app/components/login/login.component";
import {NativeScriptFormsModule} from "nativescript-angular";
import {FirebaseService} from "~/app/services/firebase.service";
import {HomeComponent} from "~/app/components/home/home.component";
import {RegisterComponent} from "~/app/components/register/register.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent
    ],
    providers: [FirebaseService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
