import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras, ActivatedRoute } from "@angular/router";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { Page } from "tns-core-modules/ui/page";

import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
import { Image } from "tns-core-modules/ui/image/image";
import * as fs from "tns-core-modules/file-system";
import * as firebase from "nativescript-plugin-firebase";
import { FirebaseService } from "~/app/services/firebase.service";

@Component({
    selector: "tp",
    moduleId: module.id,
    templateUrl: "takePhoto.component.html",
    styleUrls: ["takePhoto.component.css"]
})

export class TakePhotoComponent {
    
    private beerName: string;
    private breweryName: string;
    private beerStyle: string;
    private beerAbv: string;
    private beerPlato: string;

    constructor(private _page: Page, private route: ActivatedRoute, private firebaseService: FirebaseService, private router: RouterExtensions) {
        this.route.queryParams.subscribe(params => {
            this.beerName = params["beerName"],
            this.breweryName = params["breweryName"],
            this.beerStyle = params["beerStyle"],
            this.beerAbv = params["beerAbv"],
            this.beerPlato = params["beerPlato"]
        })
    }
    
    public options: ImagePickerOptions = {
        android: {
            isCaptureMood: false, // if true then camera will open directly.
            isNeedCamera: true,
            maxNumberFiles: 1,
            isNeedFolderList: true
        }, ios: {
            isCaptureMood: false, // if true then camera will open directly.
            maxNumberFiles: 1
        }
    };

    private onContinueTap() {

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "beerName": this.beerName,
                "breweryName": this.breweryName,
                "beerStyle": this.beerStyle,
                "beerAbv": this.beerAbv,
                "beerPlato": this.beerPlato
            }
        }

        ApplicationSettings.setBoolean("flagUploadPhoto", true);
        this.router.navigate(["/judgeBeer"], navigationExtras);
    }

    private onSkipPhotoTap() {

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "beerName": this.beerName,
                "breweryName": this.breweryName,
                "beerStyle": this.beerStyle,
                "beerAbv": this.beerAbv,
                "beerPlato": this.beerPlato
            }
        }

        ApplicationSettings.setBoolean("flagUploadPhoto", false);
        this.router.navigate(["/judgeBeer"], navigationExtras);
    }

    private pickPhoto() {
        let options: ImagePickerOptions = {
            android: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 1,
                isNeedFolderList: true
            }, ios: {
                isCaptureMood: false, // if true then camera will open directly.
                maxNumberFiles: 1
            }
        };
    
        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openImagePicker(options);
         
        mediafilepicker.on("getFiles", function (res) {
            let results = res.object.get('results') as any;
            let pathImgBeer = results[0].file as string;
            console.dir("File for upload: " + pathImgBeer);

            let myDate = new Date();
            let myDay = myDate.getDay();
            let myMonth = myDate.getMonth();
            let myYear = myDate.getFullYear();
            let mySecond = myDate.getSeconds();
            let myMinute = myDate.getMinutes();
            let myHour = myDate.getHours();
            let uploadFileName = myYear + myMonth + myDay + '_' + myHour + myMinute + mySecond + '.png' as String;
            console.log("Firebase file name: " + uploadFileName);
            
            let pathFirebaseUpload = 'uploads/checkins/' + ApplicationSettings.getString("email") + '/' + uploadFileName + '.png';
            ApplicationSettings.setString("imgBeer", pathFirebaseUpload);
            console.log("Firebase path: " + pathFirebaseUpload);

            // upload file

            // now upload the file with either of the options below:
            firebase.storage.uploadFile({
                // the full path of the file in your Firebase storage (folders will be created)
                remoteFullPath: pathFirebaseUpload,
                // option 2: a full file path (ignored if 'localFile' is set)
                localFullPath: pathImgBeer,
                // get notified of file upload progress
                onProgress: function(status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
                }
            }).then(
                function (uploadedFile) {
                    console.log("File uploaded: " + JSON.stringify(uploadedFile));
                },
                function (error) {
                    console.log("File upload error: " + error);
                }
            );
        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
         
        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);        
        });
    }

    
    
}
