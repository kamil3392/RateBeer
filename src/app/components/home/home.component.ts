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
    templateUrl: "home.component.html",
    providers: [BreweryGetService],
    styleUrls: ['home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
    public beerData: Array<any>;
    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    public constructor(private router: RouterExtensions, private myService: BreweryGetService, private _changeDetectionRef: ChangeDetectorRef, private firebaseService: FirebaseService)  { }

    public ngOnInit() {
        if(!ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/login"], { clearHistory: true });
        }
        this.extractData();
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.extractData();
        // this._changeDetectionRef.detectChanges();
    }

    // extractData() {
    //     this.myService.getData()
    //         .subscribe((result) => {
    //             this.onGetDataSuccess(result);
    //         }, (error) => {
    //             console.log(error);
    //         });
    // }

    private extractData() {
      this.firebaseService.searchBeers(ApplicationSettings.getString("email"));
      let obj = JSON.parse(ApplicationSettings.getString("listCheckIns"));
      this.beerData = Object.keys(obj.value).map(e=>obj.value[e]);
      console.log(this.beerData);
    }

    // private onGetDataSuccess(res) {
    //     this.beerData = res.data;
    // }

    public navigateAddBeer() {
        this.router.navigate(["/addBeer"]);
    }

    public navigateTakePhoto() {
        this.router.navigate(["/takePhoto"]);
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

    public  navigateSearchJudgeDetails() {
        this.router.navigate(["/searchJudgeDetails"]);
    }

    public navigateMyProfile() {
        this.router.navigate(["/myProfile"]);
    }
}
