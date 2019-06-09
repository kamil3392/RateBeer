import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { Slider } from "tns-core-modules/ui/slider";
import { Label } from 'tns-core-modules/ui/label/label';
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";

@Component({
    selector: "jb",
    moduleId: module.id,
    templateUrl: "judgeBeer.component.html",
    styleUrls: ['judgeBeer.component.css']
})
export class JudgeBeerComponent implements OnInit {
    onButtonTap(): void {
        console.log("Button was pressed");
    }

    textFieldValue: string = "";


    sliderAromaValue: number = 0;
    sliderAppearanceValue: number = 0;
    sliderTasteValue: number = 0;
    sliderBitternessValue: number = 0;
    sliderMouthfeelValue: number = 0;
    totalRating: number = 0;

    @ViewChild("myStack") mySLRef: ElementRef;

    constructor(private _page: Page) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }

    public onSliderAromaValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderAromaValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderAppearanceValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderAppearanceValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderTasteValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderTasteValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderBitternessValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderBitternessValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    public onSliderMouthfeelValueChange(args) {
        let slider = <Slider>args.object;
        this.sliderMouthfeelValue = slider.value;
        this.recalculateTotalRating();
        this.letsAnimateSL();
    }

    private recalculateTotalRating() {
        this.totalRating = this.sliderAromaValue + this.sliderAppearanceValue + this.sliderTasteValue + this.sliderBitternessValue + this.sliderMouthfeelValue;
    }

    letsAnimate(args: EventData) {

        let lblView = <Label>args.object;

        lblView.animate({ opacity: 0, duration: 300 })
            .then(() => lblView.animate({ opacity: 1, duration: 300 }))
            .catch((e) => {
                console.log(e.message);
            });
    }

    letsAnimateSL() {

        let slView: StackLayout = this.mySLRef.nativeElement;

        const animation1 = slView.createAnimation(
            {
                scale: { x: 1.1, y: 1.1 },
                duration: 200,
                curve: AnimationCurve.linear
            }
        );
        const animation2 = slView.createAnimation({
            scale: { x: 1, y: 1 },
            duration: 200,
            curve: AnimationCurve.easeOut
        });

        animation1
            .play()
            .then(() => animation2.play())
            .catch(e => {
                console.error(e.message);
            });
    }

    postBeerReview() {
        // wyslac ocene calkowita oraz wartosci poszczegolnych kategorii do bazy
    }
}
