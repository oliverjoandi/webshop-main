import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartSum = 0;

  constructor(private cartService: CartService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(items => {
      this.cartSum = 0
      items.forEach(item => {
      this.cartSum += item.cartItem.price * item.count;      
    });
    });
    let lang = localStorage.getItem("language");
    if (lang) {
      this.useLanguage(lang)};
    
  }
  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem("language", language)
}

}
