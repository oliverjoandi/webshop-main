import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';
import { AutologinService } from '../autologin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error: string = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private autologinService: AutologinService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  onLogin(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.login(loginForm.value.username, loginForm.value.password);
    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.autologinService.isLoggedIn.next(true);
        this.router.navigateByUrl("/admin");
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    loginForm.reset();
  }
}
