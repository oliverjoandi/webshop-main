import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AutologinService } from 'src/app/auth/autologin.service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item! : Item;
  @Input('loggedIn') isLoggedIn! : boolean;
  @Output() itemActiveChanged = new EventEmitter;
 
  constructor(private cartService: CartService,
    private cookieService: CookieService,
    ) { 
    
  }

  ngOnInit(): void {
   
    
  }

  OnItemActive() {
    this.item.isActive = !this.item.isActive;
    this.itemActiveChanged.emit(this.item)
  }


  onDeleteFromCart(item: Item) {
      let isDeleted = this.cartService.deleteFromCart(item);
      if (isDeleted) {
        this.item.count--;
      }
    }
  
  onAddToCart(item: Item) {
      this.cartService.addToCart(item);
      this.item.count++;
  }

}
