import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable(
    // Instead of providers array you can use provideIn
    // Learn more https://angular.io/guide/providers
    // {
    //     providedIn: "root"
    // }
)
export class BreweryGetService {
    private serverUrl = "https://api.brewerydb.com/v2/beers";

    constructor(private http: HttpClient) { }

    getData() {
        let headers = BreweryGetService.createRequestHeader();
        let params = this.createRequestParams()
        return this.http.get(this.serverUrl, { headers: headers, params: params });
    }

    getBeerData(name) {
        let headers = BreweryGetService.createRequestHeader();
        let params = this.setNameParam(name);
        return this.http.get(this.serverUrl, { headers: headers, params: params });
    }

    private static createRequestHeader() {
        return new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
        });
    }

    private createRequestParams() {
        return new HttpParams().set('styleId', '98').set('key', '6cfdfe6d1288199bdda469567699a6c4');
    }

    private setNameParam(name) {
        return new HttpParams().set('name', name).set('key', '6cfdfe6d1288199bdda469567699a6c4');
    }

}
