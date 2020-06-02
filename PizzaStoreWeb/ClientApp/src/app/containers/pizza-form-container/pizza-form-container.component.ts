import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PizzaFormValidatorsService } from './services/pizza-form-validators.service';
import { IPizzaFormInterface, Order } from './services/pizza-form.interface';
import { PizzaFormService } from './services/pizza-form.service';
import { PizzaLoaderService } from './services/pizza-loader.service';
import { log } from 'util';

@Component({
  selector: 'app-pizza-form-container',
  templateUrl: './pizza-form-container.component.html',
  styleUrls: ['./pizza-form-container.component.scss'],
  providers: [
    PizzaFormService,
    PizzaFormValidatorsService,
    PizzaLoaderService
  ]
})
export class PizzaFormContainerComponent implements OnInit, AfterViewChecked {

  ngAfterViewChecked(): void {
    if (this.grandTotalNew) {
      if (this.grandTotalNew != this.grandTotalOld) { // check if it change, tell CD update view
        this.grandTotalOld = this.grandTotalNew;
        this.cdRef.detectChanges();
      }
    }
  }
  editMode = false;
  public grandTotalOld: number = 0;
  public grandTotalNew: number = 0;
  get form(): FormGroup {
    return this.pizzaFormService.form;
  }

  get selectedPizzaGroup(): AbstractControl {
    if (!this.pizzaFormService.pizzasArray.length) return;
    return this.pizzaFormService.pizzasArray.at(this.form.get('selectedPizza').value);
  }

  constructor(private cdRef: ChangeDetectorRef,
    private pizzaLoaderService: PizzaLoaderService,
    private pizzaFormService: PizzaFormService
  ) { }

  ngOnInit() {
    // here you can check the page url if a pizza order id was specified
    // and load it from the server

  }

  async submit(data: IPizzaFormInterface) {
    if (!this.pizzaFormService.isValid) {
      return;
    }
    console.log(data);
    const order: IPizzaFormInterface = this.pizzaFormService.createPizzaOrderDto(data);

    alert(`Thanks ${order.customerDetails.firstName}, the pizza is on the way!`);

    if (this.editMode) {
      // update api endpoint call
    } else {
      // create api endpoint call
    }
  }

  reset() {
    this.pizzaFormService.resetForm();
  }

  onPizzaAdd() {
    console.log("Test");
    this.pizzaFormService.addPizza();
    this.pizzaFormService.selectPizzaForEdit(this.pizzaFormService.pizzasArray.length - 1);
  }

  onPizzaDelete(index: number) {
    this.pizzaFormService.deletePizza(index);
  }

  onPizzaSelected(index: number) {
    this.pizzaFormService.selectPizzaForEdit(index);
  }

  broadCastTotal(total: number) {
    let x = 0;
    this.pizzaFormService.form.value.pizzas.forEach(function (arrayItem) {
      if (arrayItem)
        x = (x + arrayItem.totalPrice) != undefined ? (x + arrayItem.totalPrice) : 0;
    });
    this.grandTotalNew = isNaN(x) ? 0 : x;
  }


}
