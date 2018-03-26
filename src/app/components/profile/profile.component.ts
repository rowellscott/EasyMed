import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = <any>{};
  profile = <any>{};

  // updatedUsername: String;
  // updatedFirstName: String;
  // updatedLastName: String;
  // updatedGender: String;
  // updatedAddress: String;
  // updatedCity: String;
  // updatedState: String;
  // updatedZip: Number;
  // updatedInsuranceCo: String;

  updatedUser: Object = {};

  saveError=""; 

  baseUrl = environment.apiBase;
  logoutError: String;

  constructor(
    private myUser: UserService,
    private myAuth: AuthService,
    private myRouter: Router,
    private myRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myAuth
    .checklogin()
    // If successful, logged in
    .then(resultFromApi => {
      this.user = resultFromApi;
      console.log(this.user);
    })
    // Send Error To console
    .catch(err => {
      console.log(err);
      this.myRouter.navigate(['/']);
    });
    this.myRoute.params.subscribe(
      (params) => {
        console.log(params['id']);
        this.getProfileInfo(params['id']);
      });
  }

    getProfileInfo(id) {
      this.myUser.getProfile(id).
      then(res => {
        this.profile = res;
        this.updatedUser = res;
        console.log('Profile: ', this.profile);
      })
      .catch(err => {
        console.log(err);
      });
    }

    updateProfile(id, formData) {
      // const formInfo = formData.form.controls;
      // this.updatedUsername = formInfo.updatedUsername.value;
      // this.updatedFirstName = formInfo.updatedFirstName.value;
      // this.updatedLastName = formInfo.updatedLastName.value;
      // this.updatedGender = this.profile.gender;
      // this.updatedAddress = formInfo.updatedAddress.value;
      // this.updatedCity = formInfo.updatedCity.value;
      // this.updatedState = formInfo.updatedState.value;
      // this.updatedZip = formInfo.updatedZip.value;
      // if (this.profile.role==="Patient"){
      //     this.updatedInsuranceCo = formInfo.updatedInsuranceCo.value;
      //   }
      // //Send Updates To Api
      this.sendUpdatesToApi(id);
    }

    sendUpdatesToApi(id) {
      this.updatedUser = {
        updatedUsername: this.profile.username,
        updatedFirstName: this.profile.firstName,
        updatedLastName: this.profile.lastName,
        updatedGender: this.profile.gender,
        updatedAddress: this.profile.address,
        updatedCity: this.profile.city,
        updatedState: this.profile.state,
        updatedZip: this.profile.zip,
        updatedInsuranceCo: this.profile.insurance_co
      };
      
      this.myUser.updateUser(id, this.updatedUser)
      .toPromise()
      .then( res => {
        this.myRouter.navigate(['/users/', id]);
      })
      .catch( err => {
        this.saveError = 'Please Fill In All Fields';
        window.scroll(0, 0);
        console.log('Error Updating User', err);
      });
    }

    deleteThisUser(){
      if (!confirm("Are you sure?")) {
        return;
      }
      this.myUser.deleteUser(this.user._id)
        .then( res => {
          this.myRouter.navigate(['/'])
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

