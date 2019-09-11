import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";

import * as dialogs from "tns-core-modules/ui/dialogs";
import {FirebaseService} from '../../services/firebase.service';
import { columnSpanProperty } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";

class DataItem {
    constructor(public name: string) { }
}

@Component({
    moduleId: module.id,
    templateUrl: "./searchJudgeV2.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchJudgeComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    dialogOpen = false;
    constructor(private router: RouterExtensions, private firebaseService: FirebaseService) {}

    ngOnInit(): void { }


    goHome() {
        this.router.navigate(["/home"], {clearHistory: true})
    }

    private arrayItems: Array<DataItem> = [];
    public myItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        let flagJudgeNotFound = false      
        console.log("Search value: " + searchValue)
        this.myItems = new ObservableArray<DataItem>();
        if (searchValue !== "") {
            this.firebaseService.searchJudge(searchValue).then(
                function (results: any) {
                    console.log('printing results: ' + JSON.stringify(results.value))
                    if (JSON.stringify(results.value) !== '{}') {                
                        ApplicationSettings.setString("judgeEmail", searchValue)
                        dialogs.confirm({
                            title: "Judge found !",
                            okButtonText: "OK"
                        })
                    } else {
                        dialogs.confirm({
                            title: "Judge not found",
                            message: "Email address not found.",
                            okButtonText: "Keep looking",
                        })
                    }
                }
            )
        }
    }

    public goJudgeProfile() {
        let judgeEmail = ApplicationSettings.getString("judgeEmail")
        if (judgeEmail) {
            ApplicationSettings.setString("judgeEmail", "")
            console.log("Navigating to judge: " + judgeEmail)
            this.navigateJudgeProfile(judgeEmail)
        }

        
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a Judge and press enter";

        this.myItems = new ObservableArray<DataItem>();
        this.arrayItems.forEach(item => {
            this.myItems.push(item);
        });
    }

    public navigateJudgeProfile(email: string) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "email": email
            }
        }
        this.router.navigate(["/myProfile"], navigationExtras)
    }

    public goBack() {
        this.router.navigate(["/home", false], {clearHistory: true})
    }

    ngAfterViewInit(): void {
        this.drawer = this.drawerComponent.sideDrawer;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    public navigateMyProfile() {
        this.router.navigate(["/myProfile"]);
    }

    public navigateUserSettings() {
        this.router.navigate(["/userSettings"]);
    }
    
    public navigateSearchJudgeDetails() {
        this.router.navigate(["/searchJudgeDetails"]);
    }

    public navigateHome() {
        this.router.navigate(["/home"]);
    }

    public logout() {
        ApplicationSettings.remove("authenticated");
        this.router.navigate(["/selectLoginType"], { clearHistory: true });
    }

    public navigateAddBeer() {
        this.router.navigate(["/addBeer"]);
    }
}
