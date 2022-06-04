import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'note-list',
    pathMatch: 'full'
  },
  {
    path: 'note-list',
    component: NotesListComponent
  },
  // {
  //   path: 'patient-create',
  //   component: PatientCreateComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
