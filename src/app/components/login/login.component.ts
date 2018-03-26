import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private myAuth: AuthService, private myRouter: Router) { }
  loginInfo={
    username:'',
    password:'',
  }

  user: any; 

  loginErrorMessage: String;

  ngOnInit() {
    this.myAuth
    .checklogin()
    // If successful, logged in 
    .then(resultFromApi => {
      this.user = resultFromApi;
      this.myRouter.navigate(['users/' + this.user._id]);
    })
    // Send Error To console
    .catch(err =>{
      console.log(err)
    });
  }

  doLogin() {
    this.myAuth.login(this.loginInfo)
    .then((resultFromApi)=>{
      
      this.user = resultFromApi;
      // console.log(this.user);
      this.loginInfo = {
        username: '',
        password: ''
      };

    this.loginErrorMessage = '';

    // this.myRouter.navigate(['/users/:id'])
    this.myRouter.navigate(['users/' + this.user._id]);
    })
    .catch(err => {
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message;
    });
  }
}
