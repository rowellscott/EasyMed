import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { VisitService } from './services/visit.service';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';

import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { VisitHistoryComponent } from './components/visit-history/visit-history.component';
import { NewVisitComponent } from './components/new-visit/new-visit.component';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import { SearchPipe } from './pipes/search.pipe';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    NewClientComponent,
    VisitHistoryComponent,
    NewVisitComponent,
    VisitDetailsComponent,
    SearchPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [AuthService, UserService, VisitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
