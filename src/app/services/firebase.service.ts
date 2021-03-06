import * as firebase from "nativescript-plugin-firebase";
import {Injectable, NgZone, Output} from "@angular/core";
import {User} from '../models/user.model';
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class FirebaseService {
    constructor(private ngZone: NgZone){}

    beers: any;

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

    public addUser(email: string) {
        firebase.push(
            "/users",
            {
                "mail": email,
            }
        ).then(
            function (result) {
                console.log("created user key: " + result.key)
            }
        )
    }

    public getCurrentUser() {
        return firebase.getCurrentUser().then((result: any) => {
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
    
    searchJudge(email) {
        console.log("Search judge criteria: " + email)
        let resultFoundFunction = function(result) {
            // console.log(JSON.stringify(result));
            // appSettings.setString("resultJudgeSearch", JSON.stringify(result))
            // return result
        }

        return firebase.query(resultFoundFunction,
            "/users",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'mail'
                },
                ranges: [
                    {
                        type: firebase.QueryRangeType.START_AT,
                        value: email
                    },
                    {
                        type: firebase.QueryRangeType.END_AT,
                        value: email
                    }
                ]
            }
        )
    };

    searchCheckIn(checkInID) {
        console.log("Search check in criteria: " + checkInID)
        let resultFoundFunction = function(result) {
            console.log(JSON.stringify(result))
        }
        firebase.query(resultFoundFunction,
            "/beers",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY,
                },
                ranges: [
                    {
                        type: firebase.QueryRangeType.START_AT,
                        value: checkInID
                    },
                    {
                        type: firebase.QueryRangeType.END_AT,
                        value: checkInID
                    }
                ]
            }
            )
    }


    searchBeers(email) {
        console.log("Search beers criteria: " + email)
        let resultFoundFunction = function(result) {
            appSettings.setString("listCheckIns", JSON.stringify(result))
        }
        firebase.query(resultFoundFunction,
            "/beers",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'checkInDetails/user'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: email
                }
                // ranges: [
                //     {
                //         type: firebase.QueryRangeType.START_AT,
                //         value: email
                //     },
                //     {
                //         type: firebase.QueryRangeType.END_AT,
                //         value: email
                //     }
                // ]
            }
            )
    }

    getBeer(name) {
        let resultFoundFunction = function(result) {
            appSettings.setString("beerDetails", JSON.stringify(result))
        }
        firebase.query(resultFoundFunction,
            "/beers",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'beerDetails/beerName'
                },
                ranges: [
                    {
                        type: firebase.QueryRangeType.START_AT,
                        value: name
                    },
                    {
                        type: firebase.QueryRangeType.END_AT,
                        value: name
                    }
                ]
            }
        )
    }

    register(user: User) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        }).then(
            function (result:any) {
                firebase.push(
                    "/users",
                    {
                        "mail": user.email,
                        "dateJoined": Date.now()
                    }
                ).then(
                    function (result) {
                        console.log("created user key: " + result.key)
                    }
                )
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
            appSettings.setString("email", user.email)
            console.log("Logging as: " + user.email)
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
