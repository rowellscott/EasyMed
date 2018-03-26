import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class VisitService {

  constructor(private myHttp: Http) { }

  getVisitHistory(id) {
    return this.myHttp.get(`${environment.apiBase}/api/visits/${id}`,
    {
      withCredentials: true
    })
    .map(res => res.json());
  }

  addNewVisit(id, newVisit) {
    return this.myHttp.post(`${environment.apiBase}/api/visits/new/${id}`, newVisit,
    {
      withCredentials: true
    })
    .toPromise()
    .then(res => res.json());
  }

  getDetails(id){
    return this.myHttp.get(`${environment.apiBase}/api/visits/visit/${id}`,
    {
      withCredentials: true
    })
    .toPromise()
    .then(res => res.json());
  }
}
