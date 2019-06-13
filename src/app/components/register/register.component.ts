import { Component } from "@angular/core";
import { Location } from "@angular/common";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../models/user.model';
import {RouterExtensions} from "nativescript-angular";

@Component({
    moduleId: module.id,
    selector: "rr-register",
    templateUrl: "register.component.html",
    styleUrls: ["register.component.css"]
})
export class RegisterComponent {
    isAuthenticating = false;
    public user: User;

    public constructor(private location: Location, private firebaseService: FirebaseService, private router: RouterExtensions) {

        this.user = new User();
    }

    public goBack() {
        this.router.navigate(["/login", false], {clearHistory: true})
    }
    signUp() {
        this.firebaseService.register(this.user)
            .then(() => {
                this.isAuthenticating = false;
                this.router.navigate(["/login", false], {clearHistory: true})
                //  this.toggleDisplay();
            })
            .catch((message:any) => {
                alert(message);
                this.isAuthenticating = false;
            });
    }

}
