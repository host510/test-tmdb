import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NotfoundComponent} from "./notfound/notfound.component";
import {MaterialModule} from "./material.module";
import {MovieIdService} from "./services/movie-id.service";


@NgModule({
  declarations: [
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [MovieIdService],
  exports: [MaterialModule]
})
export class SharedModule { }
