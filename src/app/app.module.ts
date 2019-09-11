import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {LoginComponent} from "~/app/components/login/login.component";
import {NativeScriptFormsModule} from "nativescript-angular";
import {FirebaseService} from "~/app/services/firebase.service";
import {HomeComponent} from "~/app/components/home/home.component";
import {RegisterComponent} from "~/app/components/register/register.component";
import {SelectLoginTypeComponent} from "~/app/components/selectLoginType/select-login-type.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import { JudgeBeerComponent } from "./components/judgeBeer/judgeBeer.component";
import { AddBeerComponent } from "./components/addBeer/addBeer.component";
import {BeerDetailsComponent} from "~/app/components/beerDetails/beer-details.component";
import { SearchBeerComponent } from "~/app/components/searchBeer/searchBeer.component";
import { SearchJudgeDetailsComponent } from "~/app/components/searchJudgeDetails/searchJudgeDetails.component";
import { SearchJudgeListComponent } from "~/app/components/searchJudgeList/searchJudgeList.component";
import { TakePhotoComponent } from "~/app/components/takePhoto/takePhoto.component";
import { MyProfile } from "~/app/components/myProfile/myProfile.component";
import { UserSettingsComponent } from "~/app/components/userSettings/userSettings.component";
import { SearchJudgeComponent } from "~/app/components/searchJudgeV2/searchJudgeV2.component";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        SelectLoginTypeComponent,
        JudgeBeerComponent,
        AddBeerComponent,
        BeerDetailsComponent,
        SearchBeerComponent,
        SearchJudgeDetailsComponent,
        SearchJudgeListComponent,
        TakePhotoComponent,
        MyProfile,
        UserSettingsComponent,
        SearchJudgeComponent
    ],
    providers: [FirebaseService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
