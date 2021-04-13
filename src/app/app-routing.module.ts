import { GragComponent } from './client/grag/grag.component';
import { Step1Component } from './client/step1/step1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './basics/homepage/homepage.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { DatabaseComponent } from './client/database/database.component';

import { InscriptionComponent } from './basics/inscription/inscription.component';
import { Step2Component } from './client/step2/step2.component';
import { ForgetpasswordComponent } from './basics/forgetpassword/forgetpassword.component';
import { Forgetpassword2Component } from './basics/forgetpassword2/forgetpassword2.component';

import { MailConfirmComponent } from './basics/mail-confirm/mail-confirm.component';
import { CodeVerificationComponent } from './basics/code-verification/code-verification.component';



import { AuthGuard } from './_guard/auth.guard'
import { ToastrModule } from 'ngx-toastr'
import { ForumComponent } from './client/forum/forum.component';
import { ForumlistComponent } from './client/forumlist/forumlist.component';
import { DetailforumComponent } from './client/detailforum/detailforum.component';
import { DashboardAdminComponent } from './admin/dashboardAdmin/dashboardAdmin.component';
import { ProfileadminComponent } from './admin/profileadmin/profileadmin.component';

const routes: Routes = [
  { path: '',
  component: HomepageComponent,
   loadChildren: () =>
    import('./basics/basics.module')
    .then(m => m. BasicsModule) },
    { path:'inscription',
    component: InscriptionComponent,
     loadChildren: () =>
      import('./basics/basics.module')
      .then(m => m. BasicsModule) },
    { path: 'step1/:id',
    component: Step1Component,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },

    { path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },
    { path: 'grag',
    component: GragComponent,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },

    { path: 'step2',
    component: Step2Component,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },
    { path: 'forgetpassword',
    component: ForgetpasswordComponent,
     loadChildren: () =>
      import('./basics/basics.module')
      .then(m => m. BasicsModule) },
      //verifi
      { path: 'mail-confirm/:email',
      component: MailConfirmComponent,
       loadChildren: () =>
        import('./basics/basics.module')
        .then(m => m. BasicsModule) },
        //forget2 reset-password-2/:code
          //forget
      { path: 'forgetpassword2/:code',
      component: Forgetpassword2Component,
       loadChildren: () =>
        import('./basics/basics.module')
        .then(m => m. BasicsModule) },
    {
      path: 'code-verification/:id',
      component: CodeVerificationComponent
    },
    {
      path: 'database',
      component: DatabaseComponent
    },
    { path: 'forum',
    component: ForumComponent,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },
    { path: 'forumlist',
    component: ForumlistComponent,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },
    { path: 'forumdetail/:forumid',
    component: DetailforumComponent,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },
    { path: 'forumlist',
    component: ForumlistComponent,
    loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },


    { path: 'Admin/dashboard',
    component: DashboardAdminComponent,
    loadChildren: () =>
    import('./admin/admin.module')
    .then(m => m. AdminModule) },
    { path: 'Admin/dashboard/profile',
    component: ProfileadminComponent,
    loadChildren: () =>
    import('./admin/admin.module')
    .then(m => m. AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ToastrModule.forRoot(),],
  exports: [RouterModule]
})
export class AppRoutingModule { }


