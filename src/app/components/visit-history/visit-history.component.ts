import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VisitService } from '../../services/visit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {

  constructor(
    private myAuth: AuthService,
    private myRouter: Router,
    private myVisits: VisitService,
    private route: ActivatedRoute,
    private myUser: UserService

  ) { }
  user = <any>Object;
  visitHistory: any;
  patientId: String;
  visitHistoryError: String;
  logoutError: String;

  ngOnInit() {
    this.myAuth
    .checklogin()
    // If successful, logged in
    .then(resultFromApi => {
      this.user = resultFromApi;
      console.log('Visit History user:', this.user);
    })
    // Send Error To console
    .catch(err => {
      console.log(err);
      this.myRouter.navigate(['/']);
    });
    this.route.params.subscribe(
      (params) => {
        console.log(params['id']);
        this.getVisits(params['id']);
        this.patientId = params['id'];
      });
  }

  getVisits(id) {
    this.myVisits.getVisitHistory(id).
    subscribe( visits => {
      console.log('visits:', visits);
      this.visitHistory = visits;
      console.log(this.visitHistory)
    },
      () => {
        this.visitHistoryError = 'Error Finding Visit History';
        console.log(this.visitHistoryError);
      });
  }

  deletePatient(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myUser.deleteUser(this.patientId)
      .then( res => {
        this.myRouter.navigate(['/users', this.user._id]);
      })
      .catch( err => {
        console.log("Error in deleting:", err)
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
