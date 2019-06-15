import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";

class DataItem {
    constructor(public name: string) { }
}

@Component({
    moduleId: module.id,
    templateUrl: "./searchJudge.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchJudgeComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(private router: RouterExtensions) {}

    ngOnInit(): void { }

    goHome() {
        this.router.navigate(["/home"], {clearHistory: true})
    }

    private arrayItems: Array<DataItem> = [];
    public myItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();

                      // TO DO

    // constructor() {
    //     this.arrayItems.push(new DataItem("Judge_1"));
    //     this.arrayItems.push(new DataItem("Judge_2"));
    //     this.arrayItems.push(new DataItem("Judge_3"));
    //     this.arrayItems.push(new DataItem("Judge_4"));
    //     this.arrayItems.push(new DataItem("Judge_5"));
    //     this.arrayItems.push(new DataItem("Judge_6"));
    //     this.arrayItems.push(new DataItem("Judge_7"));

    //     this.myItems = new ObservableArray<DataItem>(this.arrayItems);
    // }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this.myItems = new ObservableArray<DataItem>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems[i]);
                }
            }
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

    public navigateSearchJudge() {
        this.router.navigate(["/searchJudge"]);
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
