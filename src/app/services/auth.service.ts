import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor( private myHttp: Http) { }
    // Sign Up Post Function To Backend
    signup(componentInfo) {

    return this.myHttp.post(`${environment.apiBase}/api/signup`,
    {
      signUpUsername: componentInfo.username,
      signUpPassword: componentInfo.password,
      signUpFirstName: componentInfo.firstName,
      signUpLastName: componentInfo.lastName,
      signUpAddress: componentInfo.address,
      signUpCity: componentInfo.city,
      signUpState: componentInfo.state,
      signUpZip: componentInfo.zip,
      signUpRole: componentInfo.role
    },
    { withCredentials: true }
  ).toPromise()
  .then(
    res => res.json());
  }

  login(componentInfo) {
    return this.myHttp.post(
        `${environment.apiBase}/api/login`,
        // Form Body To Send to Backend
        {
          loginUsername: componentInfo.username,
          loginPassword: componentInfo.password
        },

        // Send Cookies Across Domains
        { withCredentials: true}
      ).toPromise()
      .then(res => res.json()
    );
  }

  checklogin() {
    return this.myHttp
    .get(
      `${environment.apiBase}/api/checklogin`,
    { withCredentials: true}
    )
    .toPromise()
    .then(res => res.json());
  }


  logout() {
    return this.myHttp
    .post(
      `${environment.apiBase}/api/logout`,
      {},
      { withCredentials: true }
    )
    .toPromise()
    .then(res => res.json());
  }
}
