import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: { cartItem: Item, count: number }[] = [];
  cartChanged = new Subject<{ cartItem: Item, count: number }[]>();


  constructor() { }
}
