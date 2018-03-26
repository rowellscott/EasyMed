import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})

export class NewClientComponent implements OnInit {
  newClient = {
    patientFirstName: '',
    patientLastName: '',
    patientAddress: '',
    patientCity: '',
    patientState: '',
    patientZip: Number,
    patientGender: '',
    patientInsuranceCo: '',
  };

  user = <any>{};
  savingError: String;
  logoutError: String;

  myUploader = new FileUploader({
    url: environment.apiBase + '/api/users/new',
    itemAlias: 'patientImage'
  });

  constructor(
    private myUser: UserService,
    private myAuth: AuthService,
    private myRouter: Router
  ) {}

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
  }

    saveNewClient() {
      if (this.myUploader.getNotUploadedItems().length === 0) {
        this.saveNewClientNoImage();
        console.log('no image');
      } else {
        this.saveNewClientWithImage();
        console.log('image');
      }
    }


    saveNewClientNoImage() {
      //Trim Space from Name
      this.newClient.patientFirstName = this.newClient.patientFirstName.trim();
      this.newClient.patientLastName = this.newClient.patientLastName.trim();
      console.log("Patient Name Trim:", this.newClient.patientFirstName, this.newClient.patientLastName);
      this.myUser.createClient(this.newClient)
      .then(res => {
        console.log("Add Client res:", res);
        this.newClient = {
          patientFirstName: '',
          patientLastName: '',
          patientAddress: '',
          patientCity: '',
          patientState: '',
          patientZip: Number ,
          patientGender: '',
          patientInsuranceCo: '',
        };
        this.savingError = '';
        this.myRouter.navigate(['/visits/new', res._id]);
      })
      .catch( err => {
        this.savingError = 'Error Adding Client';
        window.scrollTo(0, 0);
      });
    }

    saveNewClientWithImage() {
      //Trim Space From Name
      this.newClient.patientFirstName = this.newClient.patientFirstName.trim();
      this.newClient.patientLastName = this.newClient.patientLastName.trim();
      console.log("Patient Name Trim:", this.newClient.patientFirstName, this.newClient.patientLastName);

        this.myUploader.onBuildItemForm = (item, form) => {
          form.append('patientFirstName', this.newClient.patientFirstName);
          form.append('patientLastName', this.newClient.patientLastName);
          form.append('patientAddress', this.newClient.patientAddress);
          form.append('patientCity', this.newClient.patientCity);
          form.append('patientState', this.newClient.patientState);
          form.append('patientZip', this.newClient.patientZip);
          form.append('patientGender', this.newClient.patientGender);
          form.append('patientInsuranceCo', this.newClient.patientInsuranceCo);
          console.log("this.newClient.patientGender: ", this.newClient.patientGender)
        };
      this.myUploader.onSuccessItem = (item, response) => {
        this.newClient = {
          patientFirstName: '',
          patientLastName: '',
          patientAddress: '',
          patientCity: '',
          patientState: '',
          patientZip: Number,
          patientGender: '',
          patientInsuranceCo: '',
        };
        this.savingError = '';
        const resObj = JSON.parse(`${response}`)
        // console.log("item:", item, "res:", response, "resJSON:", resObj);
        this.myRouter.navigate(['/visits/new', resObj._id ]);
      };
      this.myUploader.onErrorItem = (item, response) => {
        
        this.savingError = 'Error Saving Phone With Image';
      };
      this.myUploader.uploadAll();
    }

    logout() {
      this.myAuth.logout()
      .then(() => {
        this.myRouter.navigate(['/']);
      })
      .catch(()=> {
        this.logoutError = 'Error Logging Out';
      });
    }
}


