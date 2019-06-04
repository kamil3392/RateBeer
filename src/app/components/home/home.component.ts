import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { BreweryGetService } from "~/app/services/brewery-get.service";

@Component({
    moduleId: module.id,
    selector: "RR-secure",
    templateUrl: "home.component.html",
    providers: [BreweryGetService]
})
export class HomeComponent implements OnInit {

    public beerData: string;
    public constructor(private router: RouterExtensions, private myService: BreweryGetService) { }

    public ngOnInit() {
        if(!ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/login"], { clearHistory: true });
        }
        this.extractData();
    }

    extractData() {
        this.myService.getData()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
    }

    private onGetDataSuccess(res) {
        this.beerData = res.data;
    }

    public logout() {
        ApplicationSettings.remove("authenticated");
        this.router.navigate(["/selectLoginType"], { clearHistory: true });
    }
}
