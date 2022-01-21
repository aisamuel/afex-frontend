import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'giphy-search',
    pathMatch: 'full'
  },
  {
    path: 'giphy-search',
    component: SearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiphySearchRoutingModule { }
