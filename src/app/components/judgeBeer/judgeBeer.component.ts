import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { Slider } from "tns-core-modules/ui/slider";
import { Label } from 'tns-core-modules/ui/label/label';
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { ActivatedRoute } from "@angular/router";
import {FirebaseService} from '../../services/firebase.service';
import { RouterExtensions } from "nativescript-angular/router";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as appSettings from "tns-core-modules/application-settings";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    selector: "jb",
    moduleId: module.id,
    templateUrl: "judgeBeer.component.html",
    styleUrls: ['judgeBeer.component.css']
})
export class JudgeBeerComponent implements OnInit {

    textFieldValue: string = "";

    private sliderAromaValue: number = 0;
    private sliderAppearanceValue: number = 0;
    private sliderTasteValue: number = 0;
    private sliderBitternessValue: number = 0;
    private sliderMouthfeelValue: number = 0;
    private totalRating: number = 0;

    private beerName: string;
    private breweryName: string;
    private beerStyle: string;
    private beerAbv: string;
    private beerPlato: string;

    private myCheckIn: any;
    private myLocation: any;

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    @ViewChild("myStack") mySLRef: ElementRef;

    constructor(private _page: Page, private route: ActivatedRoute, private firebaseService: FirebaseService, private router: RouterExtensions) {

        this.route.queryParams.subscribe(params => {
            this.beerName = params["beerName"],
            this.breweryName = params["breweryName"],
            this.beerStyle = params["beerStyle"],
            this.beerAbv = params["beerAbv"],
            this.beerPlato = params["beerPlato"]
        })
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
    }

    postBeerReview() {
        // this.myLocation = geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
        // console.log("created beer key: " + this.myLocation)
        this.myCheckIn = {
            "beerDetails": {
              "beerName": this.beerName,
              "breweryName": this.breweryName,
              "beerStyle": this.beerStyle,
              "beerAbv": this.beerAbv,
              "beerPlato": this.beerPlato
            },
            "rating": {
              "totalRating": this.totalRating,
              "aroma": this.sliderAromaValue,
              "appearance": this.sliderAppearanceValue,
              "taste": this.sliderTasteValue,
              "bitterness": this.sliderBitternessValue,
              "mouthfeel": this.sliderMouthfeelValue
            },
            "checkInDetails": {
              "other": this.myLocation,
              "date": Date.now(),
              "user": appSettings.getString("email"),
            }
          }
        this.firebaseService.checkIn(this.myCheckIn)

        dialogs.confirm({
            title: "Rating posted",
            // message: "Do you want to add beer?",
            okButtonText: "OK",
        }).then(decision => {
            if (decision) {
                this.goHome()
            }
        });
    }

    goHome() {
        // this.router.navigate(["/home"], {clearHistory: true})
        this.router.navigate(["/home"])
    }

    goTakePhoto() {
        this.router.navigate(["/takePhoto"])
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

    public navigateMyProfile() {
        this.router.navigate(["/myProfile"]);
    }

    ngOnInit(): void {
        this._page.actionBarHidden = false;
    }

    public onSliderAromaValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderAromaValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderAppearanceValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderAppearanceValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderTasteValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderTasteValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderBitternessValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderBitternessValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderMouthfeelValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderMouthfeelValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    private recalculateTotalRating() {
        this.totalRating = this.sliderAromaValue + this.sliderAppearanceValue + this.sliderTasteValue + this.sliderBitternessValue + this.sliderMouthfeelValue;
    }

    letsAnimate(args: EventData) {

        let lblView = <Label>args.object;

        lblView.animate({ opacity: 0, duration: 300 })
            .then(() => lblView.animate({ opacity: 1, duration: 300 }))
            .catch((e) => {
                console.log(e.message);
            });
    }

    letsAnimateSL() {

        let slView: StackLayout = this.mySLRef.nativeElement;

        const animation1 = slView.createAnimation(
            {
                scale: { x: 1.1, y: 1.1 },
                duration: 200,
                curve: AnimationCurve.linear
            }
        );
        const animation2 = slView.createAnimation({
            scale: { x: 1, y: 1 },
            duration: 200,
            curve: AnimationCurve.easeOut
        });

        animation1
            .play()
            .then(() => animation2.play())
            .catch(e => {
                console.error(e.message);
            });
    }
}
