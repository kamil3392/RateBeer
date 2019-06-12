import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";

@Component({
    selector: "ab",
    moduleId: module.id,
    templateUrl: "addBeer.component.html",
    styleUrls: ["addBeer.component.css"]
})
export class AddBeerComponent implements OnInit {

    beerName;
    breweryName;
    beerStyle;
    beerAbv;
    beerPlato;


    constructor(private router: RouterExtensions) {}

    ngOnInit(): void { }

    addBeer(): void {
        // basic validation
        // if (!this.beerName || !this.breweryName || !this.beerStyle) {
        //     alert("Please enter all required fields!");
        //     return;
        // }

        //pass beer object to next screen
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "beerName": this.beerName,
                "breweryName": this.breweryName,
                "beerStyle": this.beerStyle,
                "beerAbv": this.beerAbv,
                "beerPlato": this.beerPlato
            }
        }
        this.router.navigate(["/judgeBeer"], navigationExtras);
    }

}
