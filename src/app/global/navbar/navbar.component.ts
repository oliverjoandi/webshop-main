import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartSum = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(items => {
      this.cartSum = 0
      items.forEach(item => {
      this.cartSum += item.price      
    });
    })
  }

}
