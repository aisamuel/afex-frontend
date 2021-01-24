import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { IpAddressComponent } from './ip-address/ip-address.component';
import { LeaveComponent } from './leave/leave.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'overview'
  },
  {
    path: 'overview', component: OverviewComponent,
    //  canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'ip-address'
    },
      {
        path: 'leave', component: LeaveComponent,
        //  canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard],
        //  resolve: {
        //   onboarding: SupportResolver
        //  },
      },
      {
        path: 'ip-address', component: IpAddressComponent,
        //  canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard],
        //  resolve: {
        //   onboarding: SupportResolver
        //  },
      }
       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
