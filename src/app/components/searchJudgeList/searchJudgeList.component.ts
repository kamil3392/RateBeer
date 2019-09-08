import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy} from "@angular/core";
// import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { isAndroid } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";

class DataItem {
    constructor(public name: string) { }
}


    @Component({
        selector: 'ns-judge-list',
        templateUrl: 'searchJudgeList.component.html',
        styleUrls: ['searchJudgeList.component.css'],
        // changeDetection: ChangeDetectionStrategy.OnPush
        moduleId: module.id,
    })
    export class SearchJudgeListComponent implements OnInit, AfterViewInit {

        @ViewChild(RadSideDrawerComponent)
        public drawerComponent: RadSideDrawerComponent;
        private drawer: RadSideDrawer;

        private _searchedText: string = '';
        private arrayJudges: Array<DataItem> = [];
        public judges: ObservableArray<DataItem> = new ObservableArray<DataItem>();
        public isFrom: boolean = false;

        constructor(private _params: ModalDialogParams, private _page: Page, private router: RouterExtensions, private _activeRoute: ActivatedRoute) {
            this.arrayJudges.push(new DataItem("Test Judge 1"));
            this.arrayJudges.push(new DataItem("Test Judge 2"));
            this.arrayJudges.push(new DataItem("Test Judge 3"));
            this.arrayJudges.push(new DataItem("Test Judge 4"));
            this.arrayJudges.push(new DataItem("Test Judge 5"));
            this.arrayJudges.push(new DataItem("Test Judge 6"));
            this.arrayJudges.push(new DataItem("Test Judge 7"));
            this.arrayJudges.push(new DataItem("Test Judge 8"));
            this.arrayJudges.push(new DataItem("Test Judge 9"));
            this.arrayJudges.push(new DataItem("Test Judge 10"));
            this.arrayJudges.push(new DataItem("Test Judge 11"));
            this.arrayJudges.push(new DataItem("Test Judge 12"));
            this.arrayJudges.push(new DataItem("Test Judge 13"));
            this.arrayJudges.push(new DataItem("Test Judge 14"));

            this.judges = new ObservableArray<DataItem>(this.arrayJudges);
            this.isFrom = this._params.context.isFrom;
        }

        ngOnInit() {
        }

        onClose(): void {
            this._params.closeCallback("return value");
        }

        onSelectItem(args) {
            let judge = (this._searchedText !== "") ? this.judges.getItem(args.index) : this.arrayJudges[args.index];
            this._params.closeCallback({
                isFrom: this.isFrom,
                judge
            });
        }

        public onSubmit(args) {
            let searchBar = <SearchBar>args.object;
            let searchValue = searchBar.text.toLowerCase();
            this._searchedText = searchValue;

            this.judges = new ObservableArray<DataItem>();
            if (searchValue !== "") {
                for (let i = 0; i < this.arrayJudges.length; i++) {
                    if (this.arrayJudges[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                        this.judges.push(this.arrayJudges[i]);
                    }
                }
            }
        }

        public searchBarLoaded(args) {
            let searchBar = <SearchBar>args.object;
            searchBar.dismissSoftInput();

            if (isAndroid) {
                searchBar.android.clearFocus();
            }

            searchBar.text = "";
        }

        public onClear(args) {
            let searchBar = <SearchBar>args.object;
            searchBar.text = "";
            searchBar.hint = "Search for a judge";

            this.judges = new ObservableArray<DataItem>();
            this.arrayJudges.forEach(item => {
                this.judges.push(item);
            });
        }

        public onTextChanged(args) {
            this.onSubmit(args);
        }


    ngAfterViewInit() {
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
