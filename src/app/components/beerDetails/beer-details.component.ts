import {Component, OnInit, ViewChild} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { BreweryGetService } from "~/app/services/brewery-get.service";
import {ActivatedRoute} from "@angular/router";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import {FirebaseService} from "~/app/services/firebase.service";


@Component({
    moduleId: module.id,
    selector: "RR-secure",
    templateUrl: "beer-details.component.html",
    providers: [BreweryGetService],
    styleUrls: ['beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
    public beerData: Array<any>;
    private beerName: string;
    private sub: any;

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    public constructor(private router: RouterExtensions, private firebaseService: FirebaseService, private route: ActivatedRoute) {
        this.sub = this.route.params.subscribe(params => {
            this.beerName = params['name'];
        });
    }

    ngOnInit(): void { 
        this.getBeerByName(this.beerName);
    }

    getBeerByName(name) {
        this.firebaseService.getBeer(name)

        let obj = JSON.parse(ApplicationSettings.getString("beerDetails"))
        this.beerData = Object.keys(obj.children).map(e=>obj.children[e])
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

    public goBack() {
        this.router.navigate(["/home", false], {clearHistory: true})
    }

    public navigateBeerDetails(name) {
        this.router.navigate(["/beerDetails", name]);
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

    public navigateSearchBeer() {
        this.router.navigate(["/searchBeer"]);
    }
}
