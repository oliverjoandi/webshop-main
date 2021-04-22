import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  item!: Item; 
  items: Item[] = [];
  cartItems = []

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("itemId"));
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.items = [];
      for (const key in itemsFromDatabase) {
         const element = itemsFromDatabase[key];
         this.items.push(element);
      }
      
       let cookieValue = this.cookieService.get('Ostukorv');
        this.cartItems = cookieValue == "" ? [] : JSON.parse(cookieValue);
       this.items = this.items.map(item => {
        const index = this.cartItems.findIndex(cartItem => cartItem['cartItem']['barcode'] == item.barcode);
        const { count } = index !== -1 ? this.cartItems[index] : { count: 0 };
        return {
           ...item,
           count
        };
      });
      let item = this.items.find(item => item.barcode == id);
    if (item) {
      this.item = item;
       }
    });
    }      
  

  onDeleteFromCart(item: Item) {
    let  isDeleted = this.cartService.deleteFromCart(item);
    if (isDeleted) {
      this.item.count--;
    } 
  }

  onAddToCart(item: Item) {
    this.cartService.addToCart(item);
    this.item.count++;
  }
 
}


// kui tahad et kontrolliks kahte asja siis && märk....a la - item.title == cartItem.title && item.price == cartItem.price