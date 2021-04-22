import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { cartItem: Item, count: number }[] = [];
  sumOfCart = 0;

  constructor(private cartService: CartService,
    private cookieService: CookieService) { }

  // kui minnakse HTML siis pannakse ngOnInIt käima
  ngOnInit(): void {
    console.log(this.cartService.cartItems);
    // vasakul saab väärtust, paremal annab väärtust
    this.cartItems = this.cartService.cartItems;
    this.calculateSumOfCart();
    // this.cartItems.forEach(item => {
    //   // this.sumOfCart += item.price; võib olla ka lühemalt: isendale liidad midagi juurde 
    //   this.sumOfCart = this.sumOfCart + item.price;      
    };
  

  onDeleteAllFromCart(i: number) {
    this.cartService.cartItems.splice(i,1)
    this.cartService.cartChanged.next(this.cartService.cartItems)
    this.cookieService.set( 'Ostukorv', JSON.stringify(this.cartService.cartItems));
    this.sumOfCart = 0
    this.cartItems.forEach(item => {
      this.sumOfCart = this.sumOfCart + item.cartItem.price      
    });
  }
  onEmptyCart() {
    this.cartService.cartItems.splice(0)
    this.cartService.cartChanged.next(this.cartService.cartItems)
    this.cookieService.set( 'Ostukorv', JSON.stringify(this.cartService.cartItems));
    this.calculateSumOfCart(); 
    };

  onDeleteOneFromCart(item: Item) {
      this.cartService.deleteFromCart(item);
      this.calculateSumOfCart();
      }
      
    
  
  onAddToCart(item: Item) {
      this.cartService.addToCart(item)
      this.calculateSumOfCart();
    }

  calculateSumOfCart () { 
    this.sumOfCart = 0
    this.cartItems.forEach(item => {
      this.sumOfCart = this.sumOfCart + item.cartItem.price * item.count;      
    });
  }
  
 

}
