import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VisitService } from '../../services/visit.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {
  user = <any>Object;
  visitDetails: any;
  patientId: String;
  visitDetailsError: String;
  logoutError: String;
  
  constructor(
    private myAuth: AuthService,
    private myRouter: Router,
    private myVisits: VisitService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myAuth
    .checklogin()
    // If successful, logged in
    .then(resultFromApi => {
      this.user = resultFromApi;
      console.log('Visit Details user:', this.user);
    })
    // Send Error To console
    .catch(err => {
      console.log(err);
      this.myRouter.navigate(['/']);
    });
    this.route.params.subscribe(
      (params) => {
        this.getVisitDetails(params['id']);
        this.patientId = params['id'];
      });
  }

    getVisitDetails(id){
      this.myVisits.getDetails(id).
      then( details => {
        this.visitDetails = details;
        console.log(this.visitDetails)
      })
      .catch(err => {
        console.log(err)
        this.visitDetailsError = err;
      });
    }

    logout(){
      this.myAuth.logout()
      .then(() => {
        this.myRouter.navigate(['/']);
      })
      .catch(()=>{
        this.logoutError = 'Error Logging Out'
      });
    }

}
