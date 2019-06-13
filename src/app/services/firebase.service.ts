import * as firebase from "nativescript-plugin-firebase";
import {Injectable, NgZone} from "@angular/core";
import {User} from '../models/user.model';
@Injectable()
export class FirebaseService {
    constructor(private ngZone: NgZone){}

    checkIn(myCheckIn: any) {
        firebase.push(
            "/beers",
            myCheckIn
        ).then(
            function (result) {
                console.log("created beer key: " + result.key)
            }
        )
    }

    register(user: User) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        }).then(
            function (result:any) {
                return JSON.stringify(result);
            },
            function (errorMessage:any) {
                alert(errorMessage);
            }
        )
    }

    login(user: User) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then((result: any) => {
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }

    loginByFacebook(user: User) {
        return firebase.login({
            type: firebase.LoginType.FACEBOOK,
            // Optional
            facebookOptions: {
                // defaults to ['public_profile', 'email']
                scope: [user.publicProfile, user.email]
            }
        }).then((result: any) => {
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
}
