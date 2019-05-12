import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {LoginComponent} from "~/app/components/login/login.component";
import {HomeComponent} from "~/app/components/home/home.component";
import {RegisterComponent} from "~/app/components/register/register.component";
import {SelectLoginTypeComponent} from "~/app/components/selectLoginType/select-login-type.component";

const routes: Routes = [
    { path: "", redirectTo: "/selectLoginType", pathMatch: "full" },
    { path: "selectLoginType", component: SelectLoginTypeComponent },
    { path: "login/:isFacebook", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent }
];
@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
