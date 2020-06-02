export interface IPizzaFormInterface {
  selectedPizza?: IPizzaItem;
  pizzas: IPizzaItem[];
  customerDetails: ICustomerDetails;
  totalPrice: number;
}

export interface IToppingItem {
  name: PizzaToppingsEnum;
  selected: boolean;
  price: number;
}

export class StandardPizza {
  name: string;
  price: number;
  selected: boolean
}

export interface IPizzaItem {
  size: PizzaSizeEnum;
  Prize: number;
  totalPrice: number;
  toppings: IToppingItem[] | PizzaToppingsEnum[];
  nonPizzaItem: IToppingItem[] | PizzaToppingsEnum[];
}

export class Order {
  customerDetails: ICustomerDetails;
  pizzas: IPizzaItem[];
  totalPrice: number;
}


export interface ICustomerDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: IAddress;
}

export enum PizzaSizeEnum {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
  NON_PIZZA= 4
}
export interface IAddress {
    street: string;
    houseNum: string;
    city: string;
    floor: number;
}
export enum PizzaToppingsEnum {
  SAUSAGE = 'Sausage',
  PEPPERONI = 'Pepperoni',
  HAM = 'Ham',
  OLIVES = 'Olives',
  BACON = 'Bacon',
  CORN = 'Corn',
  PINEAPPLE = 'Pineapple',
  MUSHROOMS = 'Mushrooms'
}
