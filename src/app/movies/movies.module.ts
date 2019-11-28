import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import {MoviesComponent} from "./movies.component";
import { HeaderComponent } from './header/header.component';
import {MaterialModule} from "../shared/material.module";
import { GenreComponent } from './genre/genre.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    MoviesComponent,
    HeaderComponent,
    GenreComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MoviesModule { }
