import { Component, OnInit } from '@angular/core';
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


  constructor(private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    // this.items = this.itemService.items;
    // this.itemService.saveItemsToDatabase();
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      for (const key in itemsFromDatabase) {
         const element = itemsFromDatabase[key];
         this.itemsOriginal.push(element)
         this.itemsShown = this.itemsOriginal.slice();
      }
      // this.items = itemsFromDatabase;  üleval olev asi on selleks et kaoks järjekorra number database-is
      // this.itemService.items = itemsFromDatabase;
      // slice teeb massiivist koopia
      // splice kustustab massiivist elemendi
      // split teeb stringist massiivi
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

  onSortTitle() {
    this.itemsShown.sort((a, b) => a.title.localeCompare(b.title));
  }

  onAddToCart(item: Item) {
    this.cartService.cartItems.push(item)
    this.cartService.cartChanged.next(this.cartService.cartItems)
  }
  }

