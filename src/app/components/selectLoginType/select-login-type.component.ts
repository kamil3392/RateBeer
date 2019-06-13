import {Component} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    moduleId: module.id,
    selector: "slt",
    templateUrl: "select-login-type.component.html",
    styleUrls: ["select-login-type.component.css"]
})
export class SelectLoginTypeComponent {
    public constructor(private router: RouterExtensions){}

    loginByFacebook(): void {
        this.router.navigate(['/login', 'true']);
    }

    loginByLoginAndPassword(): void {
        this.router.navigate(['/login', 'false']);
    }
}
