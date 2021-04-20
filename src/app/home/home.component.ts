import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AutologinService } from '../auth/autologin.service';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { ShowActiveItemsPipe } from './show-active-items.pipe';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemsOriginal: Item[] = [];
  itemsShown: Item[] = [];
  priceSortNumber = 0;
  titleSortNumber = 0;
  cookieValue = "";
  cartItems = [];
  user!: string | undefined;
  isLoggedIn = false;
  categoryShown = 'all';

  // kuupaev = new Date();


  constructor(
    private itemService: ItemService,
    private autologinService: AutologinService,
    private showActiveItemsPipe: ShowActiveItemsPipe,
    private cookieService: CookieService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    let cookieValue = this.cookieService.get('Ostukorv');
    this.cartItems = cookieValue == "" ? [] : JSON.parse(cookieValue);


    let user = this.autologinService.autologin();
    this.autologinService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
    })
    this.isLoggedIn = user ? true : false;
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
      this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
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

  onSortTitle() {
    this.onSort(this.titleSortNumber, 'string');
  }

  onSortPrice() {
    this.onSort(this.priceSortNumber, 'number');
  }

  
  onSort(sortNumber: number, sortType: string) {
    if(sortNumber == 0) {
      if (sortType == 'string') {
        this.itemsShown.sort((a, b) => a.title.localeCompare(b.title));
        this.titleSortNumber = 1;
      } else if ('number') {
        this.itemsShown.sort((a, b) => a.price - b.price);
        this.priceSortNumber = 1;
      } 
    } else if (sortNumber == 1) {
      if (sortType == 'string') {
        this.itemsShown.sort((a, b) => b.title.localeCompare(a.title));
        this.titleSortNumber = 2;
      } else if ('number') {
        this.itemsShown.sort((a, b) => b.price - a.price);
        this.priceSortNumber = 2;
      }
    } else {
      this.itemsShown = this.itemsOriginal.slice();
      this.onCategoryFilter(this.categoryShown);
      this.priceSortNumber = 0;
      this.titleSortNumber = 0;

    }
    this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
  }

 

  onCategoryFilter(category: string) {
    this.categoryShown = category;
    if (category !="all") {
      this.itemsShown = this.itemsOriginal.filter(item => item.category == category);
    }   else {
      this.itemsShown = this.itemsOriginal.slice();
    } 
    this.itemsShown = this.showActiveItemsPipe.transform(this.itemsShown, this.isLoggedIn);
  }

 

  itemActiveChanged(item: Item) {
    let i = this.itemsOriginal.indexOf(item);
    // this.itemsOriginal[i] = item;
    this.itemService.items[i] = item;
    this.itemService.saveItemsToDatabase().subscribe();
  }
  
}
  
