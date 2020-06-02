import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StandardPizza, Order, ICustomerDetails } from './pizza-form.interface';


@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'https://localhost:44301/api';
  constructor(private http: HttpClient) { }
  getStandardPizzas(): Observable<StandardPizza[]> {
    return this.http.get<StandardPizza[]>(`${this.apiUrl}/Pizza/GetIngredientsWithPrice`);
  }
  getNonPizzaItems(): Observable<StandardPizza[]> {
    return this.http.get<StandardPizza[]>(`${this.apiUrl}/Pizza/GetNonPizzaItems`);
  }
  addOrder(model: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/Pizza/AddOrder`,model);
  }
}
