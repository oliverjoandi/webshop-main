import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: { cartItem: Item, count: number }[] = [];
  cartChanged = new Subject<{ cartItem: Item, count: number }[]>();


  constructor(private cookieService: CookieService) { }

  deleteFromCart(item: Item) {
    let i = this.cartItems.findIndex(cartItem => item.barcode == cartItem.cartItem.barcode);
      if (i != -1) {
        if  (this.cartItems[i].count == 1 ) { 
        this.cartItems.splice(i, 1) ;
        }        
     else {
      this.cartItems[i].count--;
    }
      this.cartChanged.next(this.cartItems);
      this.cookieService.set( 'Ostukorv', JSON.stringify(this.cartItems));
      return true;      
  }
  return false;
}

  addToCart(item: Item) {
    let i = this.cartItems.findIndex(cartItem => item.barcode == cartItem.cartItem.barcode);
      if (i == -1) 
         {
          this.cartItems.push({cartItem: item, count: 1});
        } else { 
          this.cartItems[i].count += 1;
        }
        
        this.cartChanged.next(this.cartItems);
        this.cookieService.set( 'Ostukorv', JSON.stringify(this.cartItems));
  }
}


