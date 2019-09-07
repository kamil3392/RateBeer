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

class DataItem {
    constructor(public name: string) { }
}

@Component({
    moduleId: module.id,
    templateUrl: "./searchBeer.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBeerComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    dialogOpen = false;
    constructor(private router: RouterExtensions, private firebaseService: FirebaseService) {}

    ngOnInit(): void { }

    public navigateJudgeBeer() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "beerName": 0, //wstaw tu zmienna
                "breweryName": 0, //wstaw tu zmienna
                "beerStyle": 0, //wstaw tu zmienna
                "beerAbv": 0, //wstaw tu zmienna
                "beerPlato": 0 //wstaw tu zmienna
            }
        }
        this.router.navigate(["/judgeBeer"], navigationExtras);
    }

    goHome() {
        this.router.navigate(["/home"], {clearHistory: true})
    }

    private arrayItems: Array<DataItem> = [];
    public myItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();

    // ngAfterViewInit(): void {
    //     this.drawer = this.drawerComponent.sideDrawer;
    // }

                            //    TO DO

    // constructor() {
    //     this.arrayItems.push(new DataItem("Beer_1"));
    //     this.arrayItems.push(new DataItem("Beer_2"));
    //     this.arrayItems.push(new DataItem("Beer_3"));
    //     this.arrayItems.push(new DataItem("Beer_4"));
    //     this.arrayItems.push(new DataItem("Beer_5"));
    //     this.arrayItems.push(new DataItem("Beer_6"));
    //     this.arrayItems.push(new DataItem("Beer_7"));

    //     this.myItems = new ObservableArray<DataItem>(this.arrayItems);
    // }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        let flagBeerNotFound = false

        this.myItems = new ObservableArray<DataItem>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems[i]);
                    flagBeerNotFound = true
                }

            }
            console.log(flagBeerNotFound)
            if (!flagBeerNotFound) {
                dialogs.confirm({
                    title: "Beer not found",
                    message: "Do you want to add beer?",
                    okButtonText: "Add beer",
                    cancelButtonText: "Keep looking"
                }).then(decision => {
                    if (decision) {
                        this.navigateAddBeer()
                    }
                });
            }

            // if (!flagBeerNotFound) {
            //     dialogs.confirm({
            //         title: "Beer not found",
            //         message: "Do you want to add beer?",
            //         okButtonText: "Add beer",
            //         cancelButtonText: "Keep looking"
            //     }).then(decision => {
            //         if (decision) {
            //             dialogs.confirm({
            //                 title: "Add photo?",
            //                 message: "Do you want to add photo?",
            //                 okButtonText: "Add photo",
            //                 cancelButtonText: "No"
            //             }).then(decision => {
            //                 if (decision) {
            //                     this.navigateTakePhoto()
            //                 } else {
            //                     this.navigateAddBeer()
            //                 }
            //             });
            //         }
            //     });
            // }
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

    public navigateTakePhoto() {
        this.router.navigate(["/takePhoto"])
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
