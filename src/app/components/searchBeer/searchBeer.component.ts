import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {NavigationExtras} from "@angular/router";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";

import * as dialogs from "tns-core-modules/ui/dialogs";
import {FirebaseService} from '../../services/firebase.service';
import {BreweryGetService} from "~/app/services/brewery-get.service";
import {empty} from "rxjs/internal/Observer";


class DataItem {
    constructor(public name: string) {
    }
}

@Component({
    moduleId: module.id,
    templateUrl: "./searchBeer.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BreweryGetService],
})
export class SearchBeerComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    dialogOpen = false;
    private breweryGetService: BreweryGetService;
    public breweryBeerData: any;

    constructor(private router: RouterExtensions, private firebaseService: FirebaseService, private myService: BreweryGetService, private _changeDetectionRef: ChangeDetectorRef) {
    }

    private beerName: string;
    private breweryName: string;
    private beerStyle: string;
    private beerAbv: string; //zawartosc alkoholu

    ngOnInit(): void {
    }

    public navigateJudgeBeer() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "beerName": this.beerName, //wstaw tu zmienna
                "breweryName": this.breweryName, //wstaw tu zmienna
                "beerStyle": this.beerStyle, //wstaw tu zmienna
                "beerAbv": this.beerAbv, //wstaw tu zmienna
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

    private connections: any
    private subscription: any

    ngOnDestry() {
        this.subscription.unsubscribe();
    }

    private extractSingleBeerData(beerName): any{
        this.myService.getBeerData(beerName)
            .subscribe((result) => {
                this.breweryBeerData = result;
                return (result)
            }, (error) => {
                console.log(error);
                return null;
            });
    }

    private extractData() {
        this.myService.getData()
            .subscribe((result) => {
                    console.log(result);
                }, (error) => {
                    console.log(error);
                }
            );
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        let flagBeerFound = false;

        this.myItems = new ObservableArray<DataItem>();
        if (searchValue !== "") {

            this.myService.getBeerData(searchValue)
                .subscribe((result) =>{
                    this.breweryBeerData = result;
                },(error) =>{})

            // if (this.breweryBeerData) {
            //     // przypisz do zmiennych this,beerName, this.breweryName, etc. parametry z wyniku wyszukiwania piwa
            // } else {
                dialogs.confirm({
                    title: "Beer find",
                    message: "Do you want to add beer?",
                    okButtonText: "Add beer",
                    cancelButtonText: "Keep looking"
                }).then(decision => {
                    if (decision) {
                        this.navigateAddBeer()
                    }
                });
            // }

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

    // public onSubmit(args) {
    //     let searchBar = <SearchBar>args.object;
    //     let searchValue = searchBar.text.toLowerCase();
    //     let flagBeerNotFound = false

    //     this.myItems = new ObservableArray<DataItem>();
    //     if (searchValue !== "") {

    //         for (let i = 0; i < this.arrayItems.length; i++) {
    //             if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
    //                 this.myItems.push(this.arrayItems[i]);
    //                 flagBeerNotFound = true
    //             }

    //         }
    //         console.log(flagBeerNotFound)
    //         if (!flagBeerNotFound) {
    //             dialogs.confirm({
    //                 title: "Beer not found",
    //                 message: "Do you want to add beer?",
    //                 okButtonText: "Add beer",
    //                 cancelButtonText: "Keep looking"
    //             }).then(decision => {
    //                 if (decision) {
    //                     this.navigateAddBeer()
    //                 }
    //             });
    //         }

    //         // if (!flagBeerNotFound) {
    //         //     dialogs.confirm({
    //         //         title: "Beer not found",
    //         //         message: "Do you want to add beer?",
    //         //         okButtonText: "Add beer",
    //         //         cancelButtonText: "Keep looking"
    //         //     }).then(decision => {
    //         //         if (decision) {
    //         //             dialogs.confirm({
    //         //                 title: "Add photo?",
    //         //                 message: "Do you want to add photo?",
    //         //                 okButtonText: "Add photo",
    //         //                 cancelButtonText: "No"
    //         //             }).then(decision => {
    //         //                 if (decision) {
    //         //                     this.navigateTakePhoto()
    //         //                 } else {
    //         //                     this.navigateAddBeer()
    //         //                 }
    //         //             });
    //         //         }
    //         //     });
    //         // }
    //     }
    // }

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
        this.router.navigate(["/selectLoginType"], {clearHistory: true});
    }

    public navigateAddBeer() {
        this.router.navigate(["/addBeer"]);
    }
}
