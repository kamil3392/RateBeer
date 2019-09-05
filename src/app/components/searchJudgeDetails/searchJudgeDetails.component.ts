import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { SearchJudgeListComponent } from "../searchJudgeList/searchJudgeList.component";
import { action } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";

class DataItem {
    constructor(public name: string) { }
}

@Component({
    moduleId: module.id,
    templateUrl: "searchJudgeDetails.component.html",
    styleUrls: ['searchJudgeDetails.component.css'],
    //changeDetection: ChangeDetectionStrategy.OnPush
    providers: [ModalDialogService],
    selector: 'ns-book-flight'
})

    export class SearchJudgeDetailsComponent implements OnInit, AfterViewInit {


    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    // UWAGA dodać raczej ! ///////////////////////////////////////////////////////////
    // constructor(private router: RouterExtensions) {}

    ngOnInit(): void { }

    // goHome() {
    //     this.router.navigate(["/home"], {clearHistory: true})
    // }

        public showReturn: boolean = false;
        public judgeSearch: string = 'Click to search for a judge';
        // public toAirport: string = 'Enter Airport / City';
        // public typeOfService: string = 'Economy';
        // public departureDate = new Date();
        // public returnDate = new Date();

        private _overlayGridLayout: GridLayout;
        @Output() openSelectDate = new EventEmitter();
        @Input() isOnOpenDepartureDate;

        constructor(
            private _modalService: ModalDialogService,
            private router: RouterExtensions,
            private _vcRef: ViewContainerRef,
            private page: Page) {
            this._overlayGridLayout = this.page.getViewById('overlayGridLayout');
        }

        // ngOnInit() {
        //     this.returnDate.setDate(this.departureDate.getDate() + 2);
        // }

        // @Input()
        // set selectedDate(selectedDate: Date) {
        //     if (selectedDate) {
        //         if (this.isOnOpenDepartureDate) {
        //             this.departureDate = selectedDate;
        //         } else {
        //             this.returnDate = selectedDate;
        //         }
        //     }
        // }

        // toggleReturn() {
        //     this.showReturn = !this.showReturn;
        // }

        onOpenSearchAirportTap(isFrom: boolean): void {
            const options: ModalDialogOptions = {
                viewContainerRef: this._vcRef,
                context: { isFrom },
                fullscreen: true
            };

            this._modalService.showModal(SearchJudgeListComponent, options)
                .then((result: any) => {
                    if (result.isFrom) {
                        this.judgeSearch = result.judge.name;
                    }
                    // else {
                    //     this.toAirport = result.airport.name;
                    // }
                });
        }

        // onTypeServiceTap(): void {
        //     let options = {
        //         title: "Type of Service",
        //         message: "Choose your service",
        //         cancelButtonText: "Cancel",
        //         actions: ["Economy", "Premium Economy", "Premium Business"]
        //     };

        //     action(options).then((result) => {
        //         this.typeOfService = (result == 'Cancel') ? this.typeOfService : result;
        //     });
        // }

        // onOpenSelectDate(isOnOpenDepartureDate: boolean): void {
        //     this.openSelectDate.emit(isOnOpenDepartureDate);
        // }




    // private arrayItems: Array<DataItem> = [];
    // public myItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();

    //                   // TO DO

    // // constructor() {
    // //     this.arrayItems.push(new DataItem("Judge_1"));
    // //     this.arrayItems.push(new DataItem("Judge_2"));
    // //     this.arrayItems.push(new DataItem("Judge_3"));
    // //     this.arrayItems.push(new DataItem("Judge_4"));
    // //     this.arrayItems.push(new DataItem("Judge_5"));
    // //     this.arrayItems.push(new DataItem("Judge_6"));
    // //     this.arrayItems.push(new DataItem("Judge_7"));

    // //     this.myItems = new ObservableArray<DataItem>(this.arrayItems);
    // // }

    // public onSubmit(args) {
    //     let searchBar = <SearchBar>args.object;
    //     let searchValue = searchBar.text.toLowerCase();

    //     this.myItems = new ObservableArray<DataItem>();
    //     if (searchValue !== "") {
    //         for (let i = 0; i < this.arrayItems.length; i++) {
    //             if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
    //                 this.myItems.push(this.arrayItems[i]);
    //             }
    //         }
    //     }
    // }

    // public onClear(args) {
    //     let searchBar = <SearchBar>args.object;
    //     searchBar.text = "";
    //     searchBar.hint = "Search for a Judge and press enter";

    //     this.myItems = new ObservableArray<DataItem>();
    //     this.arrayItems.forEach(item => {
    //         this.myItems.push(item);
    //     });
    // }

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

    public navigateBeerDetails(name) {
        this.router.navigate(["/beerDetails", name]);
    }

    public navigateSearchBeer() {
        this.router.navigate(["/searchBeer"]);
    }

    public navigateMyProfile() {
        this.router.navigate(["/myProfile"]);
    }

    public navigateHome() {
        this.router.navigate(["/home"]);
    }

    public logout() {
        ApplicationSettings.remove("authenticated");
        this.router.navigate(["/selectLoginType"], { clearHistory: true });
    }

    public navigateJudgeBeer() {
        this.router.navigate(["/judgeBeer"]);
    }
}
