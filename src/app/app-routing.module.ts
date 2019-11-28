import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from "./shared/notfound/notfound.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: 'movies',
    loadChildren: (): Promise<any> => import('./movies/movies.module')
      .then((m) => m.MoviesModule),
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
