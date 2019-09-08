import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {LoginComponent} from "~/app/components/login/login.component";
import {HomeComponent} from "~/app/components/home/home.component";
import {RegisterComponent} from "~/app/components/register/register.component";
import {SelectLoginTypeComponent} from "~/app/components/selectLoginType/select-login-type.component";
import {JudgeBeerComponent} from "~/app/components/judgeBeer/judgeBeer.component";
import {AddBeerComponent} from "~/app/components/addBeer/addBeer.component";
import {BeerDetailsComponent} from "~/app/components/beerDetails/beer-details.component";
import { SearchBeerComponent } from "~/app/components/searchBeer/searchBeer.component";
import { SearchJudgeDetailsComponent } from "./components/searchJudgeDetails/searchJudgeDetails.component";
import { SearchJudgeListComponent } from "./components/searchJudgeList/searchJudgeList.component";
import { TakePhotoComponent } from "./components/takePhoto/takePhoto.component";
import { MyProfile } from "~/app/components/myProfile/myProfile.component";
import { UserSettingsComponent } from "~/app/components/userSettings/userSettings.component";

const routes: Routes = [
    { path: "", redirectTo: "/selectLoginType", pathMatch: "full" },
    { path: "selectLoginType", component: SelectLoginTypeComponent },
    { path: "login/:isFacebook", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "judgeBeer", component: JudgeBeerComponent },
    { path: "addBeer", component: AddBeerComponent },
    { path: "beerDetails/:name", component: BeerDetailsComponent },
    { path: "searchBeer", component: SearchBeerComponent },
    { path: "searchJudgeDetails", component: SearchJudgeDetailsComponent },
    { path: "searchJudgeList", component: SearchJudgeListComponent },
    { path: "takePhoto", component: TakePhotoComponent },
    { path: "myProfile", component: MyProfile },
    { path: "userSettings", component: UserSettingsComponent }

];
@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
