import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import {FirebaseService} from "~/app/services/firebase.service";
import {User} from "~/app/models/user.model";

@Component({
moduleId: module.id,
selector: "rr-login",
templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
isAuthenticating = false;
public user: User;

public constructor(private router: RouterExtensions, private firebaseService: FirebaseService) {
        this.user = {
          "email":"",
          "password":""
        }
    }

    public ngOnInit() {
        if(ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
        }
    }

    public login() {
     this.firebaseService.login(this.user)
      .then((result) => {
        if(result !== undefined) {
            this.isAuthenticating = true;
            ApplicationSettings.setBoolean("authenticated", true);
            this.router.navigate(["/home"], {clearHistory: true});
        } else {
            this.isAuthenticating = false;
        }
      })
      .catch((message:any) => {
        this.isAuthenticating = false;
      });
  }

}
