import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item! : Item;
  @Input() i! : number;

  constructor(private cartService: CartService,
    private cookieService: CookieService) { 
    
  }

  ngOnInit(): void {
  }
  onDeleteFromCart(item: Item) {
      let i = this.cartService.cartItems.findIndex(cartItem => item.title == cartItem.cartItem.title);
      if (i != -1) {
        if (this.cartService.cartItems[i].count == 1) {
          this.cartService.cartItems.splice(i, 1);
        } else { 
          this.cartService.cartItems[i].count -= 1
        }
        
        this.cartService.cartChanged.next(this.cartService.cartItems);
        this.cookieService.set( 'Ostukorv', JSON.stringify(this.cartService.cartItems));
      }
      // kui tahad et kontrolliks kahte asja siis && märk....a la - item.title == cartItem.title && item.price == cartItem.price
  
    }
  
    onAddToCart(item: Item) {
      let i = this.cartService.cartItems.findIndex(cartItem => item.title == cartItem.cartItem.title);
      if (i == -1) {
        this.cartService.cartItems.push({ cartItem: item, count: 1 });
        
    } else {
      this.cartService.cartItems[i].count += 1;
    }
      this.cartService.cartChanged.next(this.cartService.cartItems);
      this.cookieService.set( 'Ostukorv', JSON.stringify(this.cartService.cartItems));
    
  }

}
