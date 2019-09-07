import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { Page } from "tns-core-modules/ui/page";

import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
import { Image } from "tns-core-modules/ui/image/image";
import * as fs from "tns-core-modules/file-system";
import * as firebase from "nativescript-plugin-firebase";

import * as moment from 'moment';
import { uploadFile } from "nativescript-plugin-firebase/storage/storage";

@Component({
    selector: "tp",
    moduleId: module.id,
    templateUrl: "takePhoto.component.html",
    styleUrls: ["takePhoto.component.css"]
})

export class TakePhotoComponent {

    constructor(private router: RouterExtensions, private _page: Page) { }
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


    // public mediafilepicker: Mediafilepicker;
    // private pickPhoto() {
    //     let mediafilepicker =  new Mediafilepicker;
    //     mediafilepicker.openImagePicker(this.options)
    //     mediafilepicker.on("getFiles", function (res) {
    //         let results = res.object.get('results');
    //         console.dir("xD " + results.file);
    //         console.log("Dx " + results.file)
    //     });
         
    //     mediafilepicker.on("error", function (res) {
    //         let msg = res.object.get('msg');
    //         console.log(msg);
    //     });
         
    //     mediafilepicker.on("cancel", function (res) {
    //         let msg = res.object.get('msg');
    //         console.log(msg);
    //     });
    // }

    private onContinueTap() {
        this.router.navigate(["/searchBeer"]);
    }

    // public uploadFile(pathSourceFile: any, pathFirebase: any) {
    //     // init the file-system module
    //     var fs = require("tns-core-modules/file-system");

    //     // now upload the file with either of the options below:
    //     firebase.storage.uploadFile({
    //         // the full path of the file in your Firebase storage (folders will be created)
    //         remoteFullPath: pathFirebase,
    //         // option 2: a full file path (ignored if 'localFile' is set)
    //         localFullPath: pathSourceFile,
    //         // get notified of file upload progress
    //         onProgress: function(status) {
    //         console.log("Uploaded fraction: " + status.fractionCompleted);
    //         console.log("Percentage complete: " + status.percentageCompleted);
    //         }
    //     }).then(
    //         function (uploadedFile) {
    //             console.log("File uploaded: " + JSON.stringify(uploadedFile));
    //         },
    //         function (error) {
    //             console.log("File upload error: " + error);
    //         }
    //     );
    // }

    // public results: any;
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
            let uploadFileName = myYear + myMonth + myDay + '_' + myHour + myMinute + mySecond as String;
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
