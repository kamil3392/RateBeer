import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import {FirebaseService} from '../../services/firebase.service';
import { BreweryGetService } from "~/app/services/brewery-get.service";

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
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
    providers: [ModalDialogService, BreweryGetService],
    selector: 'ns-book-flight'
})

    export class SearchJudgeDetailsComponent implements OnInit, AfterViewInit {


    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    public beerData: Array<any>;
    private user: any;

    public showReturn: boolean = false;
    public judgeSearch: string = 'Click to search for a judge';

    private _overlayGridLayout: GridLayout;
        @Output() openSelectDate = new EventEmitter();
        @Input() isOnOpenDepartureDate;

    public constructor(
        private _modalService: ModalDialogService,
        private router: RouterExtensions,
        private _vcRef: ViewContainerRef,
        private _changeDetectionRef: ChangeDetectorRef,
        private firebaseService: FirebaseService,
        private page: Page) {
        this._overlayGridLayout = this.page.getViewById('overlayGridLayout');
        }

        public ngOnInit() {
            this.fetchCurrentUser();
            this.extractData();
        }

        ngAfterViewInit() {
            this.drawer = this.drawerComponent.sideDrawer;
        }


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

                });
            }

        fetchCurrentUser() {
        this.firebaseService.getCurrentUser().then((result: any) => {
            this.user = JSON.parse(result);
            });
        }

        private extractData() {
            this.firebaseService.searchBeers(ApplicationSettings.getString("email"));
            let obj = JSON.parse(ApplicationSettings.getString("listCheckIns"));
            this.beerData = Object.keys(obj.value).map(e=>obj.value[e]);
        }


    // public goBack() {
    //     this.router.navigate(["/home", false], {clearHistory: true})
    // }

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

    public navigateUserSettings() {
        this.router.navigate(["/userSettings"]);
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
