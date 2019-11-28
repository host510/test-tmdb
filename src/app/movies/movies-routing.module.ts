import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MoviesComponent} from "./movies.component";
import {GenreComponent} from "./genre/genre.component";
import {DetailsComponent} from "./details/details.component";


const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {path: 'details', component: DetailsComponent},
      {path: 'genres', component: GenreComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
