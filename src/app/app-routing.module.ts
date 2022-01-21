import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'giphy-search',
    loadChildren: () => import('./giphy-search/giphy-search.module').then(m => m.GiphySearchModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)
  },
 
  {
    path: '',
    redirectTo: 'giphy-search',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
