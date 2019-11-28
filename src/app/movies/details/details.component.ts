import { Component, OnInit } from '@angular/core';

import { MovieIdService } from "../../shared/services/movie-id.service";
import { ApiService } from "../../core/services/api.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private movieId: number;
  public movie = <any>[];
  public directors = [];
  public cast = [];
  private videoKey: string;

  constructor(
    private _movieIdService: MovieIdService,
    private _apiService: ApiService
    ) { }

  ngOnInit():void {
    this._movieIdService.movieId.subscribe(val => this.movieId = val);
    this.getMovieDetails();
    this.getDirectors();
    this.getActors();
  }

  private getMovieDetails():void {
    this._apiService.get(`movie/${this.movieId}?language=ru-RU&append_to_response=videos`)
      .subscribe((res) => {
          this.movie = res;
          if(res.videos.results[0]) {
            this.videoKey = res.videos.results[0].key;
          }
        }
      )
  }

  private getDirectors():void {
    let crew;
    this._apiService.get(`movie/${this.movieId}/credits?language=ru-RU`)
      .subscribe((res) => {
          crew = res.crew;
          crew = crew.filter((credit) => credit.job === 'Director');
          if(crew[0]) {
            this.directors.push([crew[0].name, crew[0].job]);
          }
        }
      )
  }

  private getActors():void {
    this._apiService.get(`movie/${this.movieId}/credits?language=ru-RU`)
      .subscribe((res) => {
         this.cast = res.cast;
        }
      )
  }

}

