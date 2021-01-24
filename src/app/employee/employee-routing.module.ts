import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveComponent } from './leave/leave.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'overview'
  },
  {
    path: 'overview', component: OverviewComponent,
    //  canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'leave'
    },
      {
        path: 'leave', component: LeaveComponent,
        //  canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard],
        //  resolve: {
        //   onboarding: SupportResolver
        //  },
      },
       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
