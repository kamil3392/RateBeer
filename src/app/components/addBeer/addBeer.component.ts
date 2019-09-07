import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ab",
    moduleId: module.id,
    templateUrl: "addBeer.component.html",
    styleUrls: ["addBeer.component.css"]
})
export class AddBeerComponent implements OnInit, AfterViewInit {

    beerName;
    breweryName;
    beerStyle;
    beerAbv;
    beerPlato;
    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(private router: RouterExtensions) {}

    ngOnInit(): void { }

    goHome() {
        this.router.navigate(["/home"], {clearHistory: true})
    }

    addBeer(): void {
        if (!this.beerName || !this.breweryName || !this.beerStyle) {
            alert("Please enter all required fields!");
            return;
        }

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "beerName": this.beerName,
                "breweryName": this.breweryName,
                "beerStyle": this.beerStyle,
                "beerAbv": this.beerAbv,
                "beerPlato": this.beerPlato
            }
        }

        dialogs.confirm({
            title: "Add photo?",
            message: "Do you want to add photo?",
            okButtonText: "Add photo",
            cancelButtonText: "No"
        }).then(decision => {
            if (decision) {
                this.router.navigate(["/takePhoto"], navigationExtras);
            } else {
                this.router.navigate(["/judgeBeer"], navigationExtras);
            }
        });
    }

    
    public navigateTakePhoto() {
        this.router.navigate(["/takePhoto"]);
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

    public navigateSearchJudgeDetails() {
        this.router.navigate(["/searchJudgeDetails"]);
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
        this.router.navigate(["/searchBeer"]);
    }
}
