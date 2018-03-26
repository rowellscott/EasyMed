import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpInfo = {
    username:'',
    password:'',
    firstName: '',
    lastName:'',
    address: '',
    city:'',
    state:'',
    zip:'',
    role:'',
    };

    baseURL = environment.apiBase;

  errorMessage: String;

  constructor( private myAuth: AuthService, private myRouter: Router) { }

  ngOnInit() {
  }

  doSignUp() {
    this.myAuth
    .signup(this.signUpInfo)
    .then(resultFromApi => {
      this.signUpInfo = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        city:'',
        state:'',
        zip:'',
        role: '',
      };

      this.errorMessage = '';

      // this.myRouter.navigate(['/']);
      console.log("Sign Up .then:", resultFromApi)
      // this.myRouter.navigate(['/users/', resultFromApi._id])
      this.myRouter.navigate(['/login']);
    })
    .catch(err => {
      console.log("Sign Up Err in Catch:", err.json())
      const parsedError = err.json();
      this.errorMessage = parsedError.message;
      window.scroll(0,0)
    });
  }
}

