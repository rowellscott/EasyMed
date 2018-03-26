import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { VisitHistoryComponent } from './components/visit-history/visit-history.component';
import { NewVisitComponent } from './components/new-visit/new-visit.component';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
  { path: 'signup',
    component: SignupComponent
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'users/:id',
    component: UsersComponent,
  },
  { path: 'users/:id/newClient',
    component: NewClientComponent,
  },
  { path: 'users/:id/edit',
    component: ProfileComponent 
  },
  { path: 'visits/:id',
    component: VisitHistoryComponent
  },
  { path: 'visits/new/:id',
    component: NewVisitComponent
  },
  { path: 'visits/visit/:id',
    component: VisitDetailsComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}