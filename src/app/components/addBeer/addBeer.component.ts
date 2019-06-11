import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

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

    constructor(private router: RouterExtensions) { }

    ngOnInit(): void { }

    addBeer(): void {
        // basic validation
        if (!this.beerName || !this.breweryName || !this.beerStyle) {
            alert("Please enter all required fields!");
            return;
        }

        //create beer object
        //pass beer object to next screen
        this.router.navigate(["/judgeBeer"]);
    }

}
