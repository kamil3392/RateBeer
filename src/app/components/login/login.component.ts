import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import {FirebaseService} from "~/app/services/firebase.service";
import {User} from "~/app/models/user.model";
import {ActivatedRoute} from '@angular/router';

@Component({
moduleId: module.id,
selector: "rr-login",
templateUrl: "login.component.html",
styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
    isAuthenticating = false;
    public user: User;
    private sub: any;
    private isFacebookLoginType: boolean = false;

    public constructor(private router: RouterExtensions, private firebaseService: FirebaseService, private route: ActivatedRoute) {
        this.sub = this.route.params.subscribe(params => {
          this.isFacebookLoginType = params['isFacebook'] === 'true';
        });

        this.user = {
          "publicProfile":"",
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
        if(this.isFacebookLoginType) {
            this.firebaseService.loginByFacebook(this.user)
                .then((result) => {
                    if (result !== undefined) {
                        this.isAuthenticating = true;
                        ApplicationSettings.setBoolean("authenticated", true);
                        this.router.navigate(["/home"], {clearHistory: true});
                    } else {
                        this.isAuthenticating = false;
                    }
                })
                .catch((message: any) => {
                    this.isAuthenticating = false;
                });
        } else {
            this.firebaseService.login(this.user)
                .then((result) => {
                    if (result !== undefined) {
                        this.isAuthenticating = true;
                        ApplicationSettings.setBoolean("authenticated", true);
                        this.router.navigate(["/home"], {clearHistory: true});
                    } else {
                        this.isAuthenticating = false;
                    }
                })
                .catch((message: any) => {
                    this.isAuthenticating = false;
                });
        }
    }

    getTitle(): string {
        return this.isFacebookLoginType ? "LOGIN BY FACEBOOK" : "LOGIN BY EMAIL AND PASSWORD";
    }

    backToSelectLoginType(): void {
        this.router.navigate(["/selectLoginType"], {clearHistory: true})
    }
}
