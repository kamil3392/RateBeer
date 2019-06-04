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
        let headers = this.createRequestHeader();
        let params = this.createRequestParams()
        return this.http.get(this.serverUrl, { headers: headers, params: params });
    }

    private createRequestHeader() {
        return new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
        });
    }

    private createRequestParams() {
        return new HttpParams().set('name', "'Murican Pilsner").set('key', '4b6937dc1eeebb88e49c93e08ed81f03');
    }
}
