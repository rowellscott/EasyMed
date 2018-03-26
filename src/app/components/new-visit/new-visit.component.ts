import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { VisitService } from '../../services/visit.service';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.css']
})
export class NewVisitComponent implements OnInit {
  user = <any>Object;
  patientID : String;
  newVisit= {
      temperatureDeg: Number,
      temperatureScale: 'F',
      heightNumOne: Number, 
      heightScaleOne: 'ft', 
      heightNumTwo: Number,
      heightScaleTwo: 'in',
      weightNum: Number,
      weightScale: 'lbs',
      bloodPressure: '',
      chiefComplaint: '',
      assessment: '',
      treatment: '',
  };

  cancelRecord={
    temperatureDeg: 90,
      temperatureScale: 'F',
      heightNumOne: 0, 
      heightScaleOne: 'ft', 
      heightNumTwo: 0,
      heightScaleTwo: 'in',
      weightNum: 0,
      weightScale: 'lbs',
      bloodPressure: 'unk',
      chiefComplaint: 'Canceled',
      assessment: 'Canceled',
      treatment: 'Canceled',
  };

  //English or Metric System Form Selector
  system = 'USA';

  newVisitError: String;
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
      console.log('New Visit User:', this.user);
    })
    // Send Error To console
    .catch(err => {
      console.log(err);
      this.myRouter.navigate(['/']);
    });
    
    this.route.params.subscribe(
      (params) => {
        console.log(params['id']);
        this.patientID = params['id'];
        console.log(this.newVisit);
      });

      // window.scroll(0,0)
  }

  addNewVisit(){
    this.myVisits.addNewVisit(this.patientID, this.newVisit)
    .then(res => {
        this.newVisit = {
          temperatureDeg: Number,
          temperatureScale: 'F',
          heightNumOne: Number, 
          heightScaleOne: 'ft', 
          heightNumTwo: Number,
          heightScaleTwo: 'in',
          weightNum: Number,
          weightScale: 'lbs',
          bloodPressure: '',
          chiefComplaint: '',
          assessment: '',
          treatment: '',
      };
      this.newVisitError='';
      this.myRouter.navigate(['/visits/', this.patientID]);
      // this.myRouter.navigate(['/users/', this.user._id]);
      window.scroll(0,0);
      // or redirect to Patient Visit History to Confirm?
    })
    .catch(err => {
        console.log("New Visit Error:", err);
        this.newVisitError = "Error Saving Visit";
        window.scrollTo(0, 0);
    });
  }

  cancelVisit(){
    this.myVisits.addNewVisit(this.patientID, this.cancelRecord)
    .then(res=>{
      this.newVisitError='';
      this.myRouter.navigate(['/users/', this.user._id]);
    })
    .catch(err => {
      console.log("Cancel Visit Error:", err);
      this.newVisitError = "Error Canceling Visit";
      window.scrollTo(0, 0);
    });
  }

  logout(){
    this.myAuth.logout()
    .then(() => {
      this.myRouter.navigate(['/']);
    })
    .catch(()=>{
      this.logoutError = 'Error Logging Out';
    });
  }


}
