import { Component, OnInit, } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { signUp } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  showLogin = true
  authError:String='';
  constructor(private seller: SellerService,
    private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: signUp): void {
    console.warn(data)
    this.seller.userSignUp(data);
  }
  login(data: signUp): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
      }
    })
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }
}
