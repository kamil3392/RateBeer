import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { BreweryGetService } from "~/app/services/brewery-get.service";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {FirebaseService} from '../../services/firebase.service';

@Component({
    moduleId: module.id,
    selector: "RR-secure",
    templateUrl: "myProfile.component.html",
    providers: [BreweryGetService],
    styleUrls: ['myProfile.component.css']
})
export class MyProfile implements AfterViewInit, OnInit {
    public beerData: Array<any>;
    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    public constructor(private router: RouterExtensions, private _changeDetectionRef: ChangeDetectorRef, private firebaseService: FirebaseService)  { }

    public ngOnInit() {
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
    }

    public navigateAddBeer() {
        this.router.navigate(["/addBeer"]);
    }

    public navigateTakePhoto() {
        this.router.navigate(["/takePhoto"]);
    }

    public navigateHome() {
        this.router.navigate(["/home"]);
    }

    public logout() {
        ApplicationSettings.remove("authenticated");
        this.router.navigate(["/selectLoginType"], { clearHistory: true });
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

    public  navigateSearchJudge() {
        this.router.navigate(["/searchJudge"]);
    }
}
