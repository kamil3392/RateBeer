import { Component } from '@angular/core';
import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset';

@Component({
    selector: "takePhoto",
    moduleId: module.id,
    templateUrl: "./takePhoto.component.html",
    styleUrls: ['./takePhoto.component.css']
})

export class HomeComponent {

    constructor() { }

    public cameraImage: ImageAsset;

    onTakePictureTap(args) {
        requestPermissions().then(
            () => this.capture(),
            () => alert('permissions rejected')
        );
    }

    onContinueTap() {
        if (this.cameraImage == null) {
            
        }
    }

    capture() {
        takePicture({ width: 250, height: 300, keepAspectRatio: true })
            .then((imageAsset: any) => {
                this.cameraImage = imageAsset;
                imageAsset.getImageAsync(function (nativeImage) {
                    let scale = 1;
                    let height = 0;
                    let width = 0;
                    if (imageAsset.android) {
                        // get the current density of the screen (dpi) and divide it by the default one to get the scale
                        scale = nativeImage.getDensity() / imageAsset.android.util.DisplayMetrics.DENSITY_DEFAULT;
                        height = imageAsset.options.height;
                        width = imageAsset.options.width;
                    } else {
                        scale = nativeImage.scale;
                        width = nativeImage.size.width * scale;
                        height = nativeImage.size.height * scale;
                    }
                    console.log(`Displayed Size: ${width}x${height} with scale ${scale}`);
                    console.log(`Image Size: ${width / scale}x${height / scale}`);
                });
            }, (error) => {
                console.log("Error: " + error);
            });
    }
}
