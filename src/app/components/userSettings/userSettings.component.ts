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
import * as firebase from "nativescript-plugin-firebase";


@Component({
    selector: "us",
    moduleId: module.id,
    templateUrl: "userSettings.component.html",
    styleUrls: ['userSettings.component.css']
})
export class UserSettingsComponent implements OnInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    @ViewChild("myStack") mySLRef: ElementRef;

    constructor(private _page: Page, private router: RouterExtensions) { }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
    }

    // private deleteUser() {
    //     var user = firebase.auth().currentUser; 
    //     user.delete().then(function() {
    //     // User deleted.
    //     console.log("user deleted")
    // }, function(error) {
    //     // An error happened.
    //     console.log("delete user error hapeed")
    // });
    // }
    
    private changePassword() {

        firebase.sendPasswordResetEmail("kgsoli@tlen.pl")
            .then(() => alert("xD"))
            .catch(error => alert("Dx"));

        // firebase.getCurrentUser()
        // .then(user => alert("User uid: " + user.uid))
        // .catch(error => alert("Trouble in paradise: " + error));


        // firebase.reauthenticate({
        //     type: firebase.LoginType.PASSWORD, // or GOOGLE / FACEBOOK
        //     // this is only required in type == PASSWORD
        //     passwordOptions: {
        //       email: 'Kgsoli@tlen.pl',
        //       password: 'Dupa123!'
        //     }
        //   }).then(
        //       function (result) {
        //         // you can now safely delete the account / change the password, etc
        //         dialogs.alert({
        //           title: "Re-authenticated user",
        //           message: JSON.stringify(result),
        //           okButtonText: "OK"
        //         });
        //       },
        //       function (error) {
        //         dialogs.alert({
        //           title: "Re-authenticate error",
        //           message: error,
        //           okButtonText: "OK"
        //         });
        //       }
        //   );
    }


    private updateUsername() {
        firebase.updateProfile({
            displayName: 'PAWIAN',
            // photoURL: 'http://provider.com/profiles/eddyverbruggen.png'
          }).then(
              function () {
                // called when update profile was successful
                console.log("dupa")
              },
              function (errorMessage) {
                console.log(errorMessage);
              }
          );
    }

    goHome() {
        // this.router.navigate(["/home"], {clearHistory: true})
        this.router.navigate(["/home"])
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
}
