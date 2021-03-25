import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AutologinService } from 'src/app/auth/autologin.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartSum = 0;
  user!: string | undefined;

  constructor(private cartService: CartService,
    private translate: TranslateService,
    private autologinService: AutologinService) { }

  ngOnInit(): void {
    this.user = this.autologinService.autologin();
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
