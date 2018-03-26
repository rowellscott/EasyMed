import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private myHttp: Http) { }

  getUser(id){
    return this.myHttp.get(`${environment.apiBase}/api/users/${id}`,
    {
      withCredentials: true
    })
    .map(res => res.json());
  }

  createClient(clientData){
      return this.myHttp.post(`${environment.apiBase}/api/users/new`,
      clientData,
      {
        withCredentials: true
      })
      .toPromise()
      .then(res => res.json());
  }

  getProfile(id) {
    return this.myHttp.get(`${environment.apiBase}/api/users/${id}/edit`,
  { withCredentials: true
  })
  .toPromise()
  .then(res => res.json());
  }

  updateUser(id, updates) {
    return this.myHttp.put(`${environment.apiBase}/api/users/${id}/edit`, updates,
  {
    withCredentials: true
  })
  .map(res => res.json());
  }

  deleteUser(id){
    return this.myHttp.delete(`${environment.apiBase}/api/users/${id}/delete`,
    {
      withCredentials: true
    })
    .toPromise();
   }
}
