import { Component, EventEmitter, Input, OnInit, Output, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-selected-pizza-viewer',
  templateUrl: './selected-pizza-viewer.component.html',
  styleUrls: ['./selected-pizza-viewer.component.scss']
})
export class SelectedPizzaViewerComponent implements OnInit, AfterViewChecked  {
  public IsVisible: boolean = false;
  @Input() selectedPizzaGroup: AbstractControl;
  @Output() addPizza = new EventEmitter();


  get toppingsArray(): FormArray {
    if (!this.selectedPizzaGroup) return;
    return this.selectedPizzaGroup.get('toppings') as FormArray;
  }
  get nonPizzaArray(): FormArray {
    if (!this.selectedPizzaGroup) return;
    return this.selectedPizzaGroup.get('nonPizzaItem') as FormArray;
  }
  ngAfterViewChecked(): void {
    if (this.selectedPizzaGroup) {
      let show = this.selectedPizzaGroup.value.size == 4;
      if (show != this.IsVisible) { // check if it change, tell CD update view
        this.IsVisible = show;
        this.cdRef.detectChanges();
      }
    }
  }
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

}
