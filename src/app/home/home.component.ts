import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemsOriginal: Item[] = [];
  itemsShown: Item[] = [];
  priceSortNumber = 0;
  cookieValue = "";
  cartItems = [];
  // kuupaev = new Date();


  constructor(
    private itemService: ItemService,
    
    ) { }

  ngOnInit(): void {
    // this.items = this.itemService.items;
    // this.itemService.saveItemsToDatabase();

    
   
    
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.itemsOriginal = [];
      this.itemService.items = [];
      for (const key in itemsFromDatabase) {
         const element = itemsFromDatabase[key];
         this.itemsOriginal.push(element)
         this.itemsShown = this.itemsOriginal.slice();
         this.itemService.items.push(element);
      }
      // this.items = itemsFromDatabase;  üleval olev asi on selleks et kaoks järjekorra number database-is
      // this.itemService.items = itemsFromDatabase;
      // slice teeb massiivist koopia
      // splice kustustab massiivist elemendi
      // split teeb stringist massiivi
      // let cartItems = this.cartService.cartItems;
      // this.itemsOriginal.map(item=> {
      //   cartItems.forEach(cartItem => ) {
      //     return { ...item, count: cartItem.count}
      //   }
      // })
    });
    
  }

  onSortPrice() {
    if(this.priceSortNumber == 0) {
      this.itemsShown.sort((a, b) => a.price - b.price);
      this.priceSortNumber = 1; 
    } else if (this.priceSortNumber == 1) {
      this.itemsShown.sort((a, b) => b.price - a.price);
      this.priceSortNumber = 2;
    } else {
      this.itemsShown = this.itemsOriginal.slice();
      this.priceSortNumber = 0;

    }
     
  }

  onCategoryFilter(category: string) {
    this.itemsShown = this.itemsOriginal.filter(item => item.category == category)
  }

  onSortTitle() {
    this.itemsShown.sort((a, b) => a.title.localeCompare(b.title));
  }

  
}
  
