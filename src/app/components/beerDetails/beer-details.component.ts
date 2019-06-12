import {Component, OnInit} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { BreweryGetService } from "~/app/services/brewery-get.service";
import {ActivatedRoute} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: "RR-secure",
    templateUrl: "beer-details.component.html",
    providers: [BreweryGetService]
})
export class BeerDetailsComponent implements OnInit {
    public beerData: Array<any>;
    private beerName: string;
    private sub: any;

    public constructor(private router: RouterExtensions, private myService: BreweryGetService, private route: ActivatedRoute) {
        this.sub = this.route.params.subscribe(params => {
            this.beerName = params['name'];
        });
    }

    ngOnInit(): void { this.getBeerByName(this.beerName); }

    getBeerByName(name) {
        this.myService.getBeerData(name)
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
    }

    private onGetDataSuccess(res) {
        this.beerData = res.data;
        console.log(this.beerData);
    }
}
