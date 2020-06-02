import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaFormValidatorsService } from './pizza-form-validators.service';
import { IPizzaFormInterface, IToppingItem, PizzaSizeEnum, PizzaToppingsEnum, StandardPizza, Order } from './pizza-form.interface';
import { PizzaService } from './pizza.service';

@Injectable()
export class PizzaFormService {
   
  public form: FormGroup;
  toppingsData: StandardPizza[];
  nonPizzaItems: StandardPizza[];

  constructor(
    private pizzaValidatorsService: PizzaFormValidatorsService,
    private fb: FormBuilder, private PizzaServiceObj: PizzaService, public PizzaService: PizzaService
  ) {
    this.form = this.fb.group({
      selectedPizza: null,
      pizzas: this.fb.array([]),
      customerDetails: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: this.fb.group({
          street: [null, Validators.required],
          houseNum: [null, Validators.required],
          city: [null, Validators.required],
          floor: [null, Validators.required],
        })
      }),
      totalPrice: 0

    }, {
      validator: this.pizzaValidatorsService.formValidator()
    });
    this.PizzaServiceObj.getStandardPizzas().subscribe(items => this.toppingsData = items);
    this.PizzaServiceObj.getNonPizzaItems().subscribe(items => this.nonPizzaItems = items);
  }

  get pizzasArray(): FormArray {
    return this.form.get('pizzas') as FormArray;
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.pizzaValidatorsService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }

  selectPizzaForEdit(index: number) {
    this.form.get('selectedPizza').setValue(index);
  }

  addPizza(): FormGroup {

    const pizzaGroup = this.getPizzaFormGroup();
    this.pizzasArray.push(this.getPizzaFormGroup());

    this.form.markAsDirty();

    return pizzaGroup;
  }

  deletePizza(index: number): void {
    this.pizzasArray.removeAt(index);
    this.form.markAsDirty();
  }

  getPizzaFormGroup(size: PizzaSizeEnum = PizzaSizeEnum.MEDIUM): FormGroup {
    return this.fb.group({
      size: [size],
      Prize: 10,
      toppings: this.mapToCheckboxArrayGroup(this.toppingsData),
      nonPizzaItem: this.mapToCheckboxArrayGroup(this.nonPizzaItems),
    }, {
      validator: this.pizzaValidatorsService.pizzaItemValidator()
    });
  }
  createPizzaOrderDto(data: IPizzaFormInterface): IPizzaFormInterface {
    var newOrder = new Order();

    newOrder.customerDetails = data.customerDetails,
     newOrder.pizzas = data.pizzas,
      newOrder.totalPrice = data.pizzas.reduce((a, b) => a + (b['totalPrice'] || 0), 0)
    //Order order = {
    //  customerDetails: data.customerDetails,
    //  pizzas: data.pizzas,
    //  totalPrice: data.pizzas.reduce((a, b) => a + (b['totalPrice'] || 0), 0)
    //};
    //for (const pizza of order.pizzas) {
    //  pizza.toppings = this.getSelectedToppings(pizza.toppings as IToppingItem[])
    //    .map((i) => {
    //      return i.name;
    //    });
    //}
    this.PizzaService.addOrder(newOrder).subscribe((data) => console.log(data));
    console.log(newOrder);
    return newOrder;
  }

  

  getSelectedToppings(toppings: IToppingItem[]): IToppingItem[] {
    return toppings.filter(i => i.selected);
  }
  getSelectedToppingstoSum(toppings: any[]): number {

    var returnVal;
    var result = toppings.filter(i => i.selected);
    if (result.length > 0)
      returnVal = result.reduce((a, b) => a + (b['price'] || 0), 0);
    else returnVal = 0;
    return returnVal;
  }


  resetForm() {
    while (this.pizzasArray.length) {
      this.pizzasArray.removeAt(0);
    }

    this.form.reset();
  }

  private mapToCheckboxArrayGroup(data: StandardPizza[]): FormArray {
    return this.fb.array(data.map((i) => {
      return this.fb.group({
        name: i.name,
        selected: false,
        price: i.price
      });
    }));
  }
}
