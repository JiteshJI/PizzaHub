import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { IPizzaItem, IToppingItem, PizzaSizeEnum } from '../../containers/pizza-form-container/services/pizza-form.interface';
import { PizzaFormService } from '../../containers/pizza-form-container/services/pizza-form.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  @Input() group: FormGroup;

  @Output() deletePizza = new EventEmitter<number>();
  @Output() addPizza = new EventEmitter();
  @Output() pizzaSelected = new EventEmitter<number>();
  @Output() sum = new EventEmitter();

  public totalPriceForAllItem: number = 0;
  pizzaDefaultPrice: number;
  public pizzaImage: string = null;

  get pizzasArray(): FormArray {
    return this.group.get('pizzas') as FormArray;
  }

  constructor(
    private pizzaFormService: PizzaFormService
  ) { }

  ngOnInit() {
  }

  getPizzaListItemClassStates(pizza: AbstractControl, index: number) {
    return {
      'PizzaList__item--active': this.group.get('selectedPizza').value === index,
      'PizzaList__item--has-error': !pizza.valid && pizza.dirty
    };
  }

  getImage(pizza: IPizzaItem): string {
    return this.getPizzaImage(pizza.size);
  }
  getPizzaTitle(pizza: IPizzaItem): string {
    console.log(pizza);
    let selectedToppings = null;
    let total = 0;
    this.pizzaDefaultPrice = 0;

    if (pizza.size != 4) {
      selectedToppings = this.pizzaFormService
        .getSelectedToppings((pizza.toppings as IToppingItem[]))
        .map(i => i.name);
      total = this.pizzaFormService
        .getSelectedToppingstoSum((pizza.toppings as IToppingItem[]));
    }
    if (pizza.size == 4) {
      selectedToppings = this.pizzaFormService
        .getSelectedToppings((pizza.nonPizzaItem as IToppingItem[]))
        .map(i => i.name);

      total = this.pizzaFormService
        .getSelectedToppingstoSum((pizza.nonPizzaItem as IToppingItem[]));
    }
    //this.pizzaFormService.form.patchValue({ totalPrice: total + pizza.Prize})
    const toppingsString = this.getToppingsString(selectedToppings);
    const sizeString = this.getPizzaSizeTitle(pizza.size);
    this.pizzaDefaultPrice = pizza.Prize + total;
    this.totalPriceForAllItem = (total + pizza.Prize);
    //this.pizzaFormService.form.patchValue({ totalPrice: total + pizza.Prize })
    pizza.totalPrice = this.totalPriceForAllItem;
    this.sum.emit(this.totalPriceForAllItem);
    return `${sizeString} pizza ${toppingsString}`;
  }


  private getToppingsString(toppings: string[]): string {
    if (!toppings || !toppings.length) return '';

    return `- ${toppings.toString()}`;
  }

  private getPizzaSizeTitle(size: PizzaSizeEnum): string {
    let pizzaSize;
    switch (size) {
      case PizzaSizeEnum.SMALL:
        pizzaSize = 'S';
        this.pizzaImage = '/assets/1.jpg';
        break;
      case PizzaSizeEnum.MEDIUM:
        pizzaSize = 'M';
        this.pizzaImage = '/assets/2.jpg';
        break;
      case PizzaSizeEnum.LARGE:
        pizzaSize = 'L';
        this.pizzaImage = '/assets/3.jpg';
        break;
      case PizzaSizeEnum.NON_PIZZA:
        pizzaSize = 'Non';
        this.pizzaImage = null;
        break;
    }

    return pizzaSize;
  }

  private getPizzaImage(size: PizzaSizeEnum): string {
    let pizzaImage;
    switch (size) {
      case PizzaSizeEnum.SMALL:
        pizzaImage = 'assets/1.jpg';
        break;
      case PizzaSizeEnum.MEDIUM:
        pizzaImage = 'assets/2.jpg';
        break;
      case PizzaSizeEnum.LARGE:
        pizzaImage = 'assets/3.jpg';
        break;
      case PizzaSizeEnum.NON_PIZZA:
        pizzaImage = null;
        break;
    }

    return pizzaImage;
  }


}
