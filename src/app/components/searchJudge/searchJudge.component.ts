import { Component, ChangeDetectionStrategy } from "@angular/core";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";

class DataItem {
    constructor(public name: string) { }
}

@Component({
    moduleId: module.id,
    templateUrl: "./searchJudge.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchJudgeComponent {
    private arrayItems: Array<DataItem> = [];
    public myItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();

    constructor() {
        this.arrayItems.push(new DataItem("Judge_1"));
        this.arrayItems.push(new DataItem("Judge_2"));
        this.arrayItems.push(new DataItem("Judge_3"));
        this.arrayItems.push(new DataItem("Judge_4"));
        this.arrayItems.push(new DataItem("Judge_5"));
        this.arrayItems.push(new DataItem("Judge_6"));
        this.arrayItems.push(new DataItem("Judge_7"));

        this.myItems = new ObservableArray<DataItem>(this.arrayItems);
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this.myItems = new ObservableArray<DataItem>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems[i]);
                }
            }
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a Judge and press enter";

        this.myItems = new ObservableArray<DataItem>();
        this.arrayItems.forEach(item => {
            this.myItems.push(item);
        });
    }

}
