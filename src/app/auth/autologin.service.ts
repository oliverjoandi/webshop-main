import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutologinService {

  constructor(private authService: AuthService) { }

  autologin() {
   return this.authService.autoLogin();
  }
}
