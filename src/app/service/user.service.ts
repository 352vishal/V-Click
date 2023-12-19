import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth= new EventEmitter<boolean>(false)
  
  constructor(private http: HttpClient, private router:Router) { }

  userSignUp(user:signUp){
    this.http.post('http://localhost:3000/user',user,{observe:'response'})
    .subscribe((result)=>{
     if(result){
       localStorage.setItem('user',JSON.stringify(result.body));
       this.router.navigate(['/']);
     }
    })
   }

   userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  userLogin(data:login){
    this.http.get<signUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }
      else{
        this.invalidUserAuth.emit(true)
      }
    })
  }
  
}
