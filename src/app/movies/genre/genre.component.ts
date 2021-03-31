import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from "../../core/services/api.service";
import { MovieIdService } from "../../shared/services/movie-id.service";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  public genres = [];
  public movies = [];
  private page: string;
  private genreId: string;
  private totalPages: number;
  public totalPagesArr: number[] = [];

  constructor(
    private router: Router,
    private _apiService: ApiService,
    private _movieIdService: MovieIdService
    ) { }

  ngOnInit():void {
    this.page = '1';
    this.getGenres();
  }

  private getGenres():void {
    this._apiService.get(`genre/movie/list?language=ru-RU`)
      .subscribe((res) => {
        this.genres = res.genres;
        this.getTotalPages(this.genres[0].id);
        }
      )
  }

  public getGenreId(event):void {
    this.genreId = this.genres[event.index].id;
    this.getByGenre(this.genreId);
  }

  private getByGenre(id):void {
    this._apiService.get(`discover/movie?include_video=true&with_genres=${id}&language=ru-RU&page=${this.page}`)
      .subscribe((res) => {
          this.movies = res.results;
        }
      )
    this.getTotalPages(this.genreId);
  }

  public sendToDetails(event):void {
    this._movieIdService.movieId.next(+event.currentTarget.id);
    this.router.navigateByUrl('movies/details');
  }

  public getPageNumber(event):void {
    this.page = event.currentTarget.id;
    this.getByGenre(this.genreId);
  }

  private  getTotalPages(id):void {
    this._apiService.get(`genre/${id}/movies`)
      .subscribe((res) => {
          this.totalPages = +res.total_pages;
          this.makeTotalPagesArr(this.totalPages);
        }
      )
  }

  private makeTotalPagesArr(total):void {
    for(let i = 0; i < total; i++) {
      this.totalPagesArr.push(i + 1);
    }
  }

  public toTop():void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  public shiftPageLinks(event) {
    const element = document.querySelector('.paginator-page-link-content') as HTMLElement;
    const pos = element.style.marginLeft.indexOf('p');
    const margin = +element.style.marginLeft.slice(0, pos);
    switch(true) {
      case margin <= (-this.totalPages * 40) + 280 && event.currentTarget.id === 'right':
        element.style.marginLeft = `${-this.totalPages * 40 + 280}px`;
        break;
      case margin >= (-this.totalPages * 40) + 280 && event.currentTarget.id === 'right':
        element.style.marginLeft = `${margin - 280}px`;
        break;
      case margin === 0 && event.currentTarget.id === 'left':
        element.style.marginLeft = '0px';
        break;
      case margin <= 280:
        element.style.marginLeft = `${margin + 280}px`;
        break;
      default: element.style.marginLeft = '0px';
    }
  }

  public toEdge(event):void {
    const element = document.querySelector('.paginator-page-link-content') as HTMLElement;
    if(event.currentTarget.id === 'start') {
      element.style.marginLeft = '0px';
    } else {
      element.style.marginLeft = `-${this.totalPages * 40 - 280}px`;
    }
  }

  // public shiftPageLinks(event) {
  //   const element = document.querySelector('.paginator-page-link-content') as HTMLElement;
  //   const pos = element.style.marginLeft.indexOf('p');
  //   const margin = +element.style.marginLeft.slice(0, pos); console.log(margin);
  //   if(margin <= (-this.totalPages * 40) + 280 && event.currentTarget.id === 'right') {
  //     element.style.marginLeft = `${-this.totalPages * 40 + 280}px`;
  //   } else if(margin >= (-this.totalPages * 40) + 280 && event.currentTarget.id === 'right'){
  //     element.style.marginLeft = `${margin - 280}px`;
  //   } else if(margin === 0 && event.currentTarget.id === 'left') {
  //     element.style.marginLeft = '0px';
  //   } else if(margin <= 280) {
  //     element.style.marginLeft = `${margin + 280}px`;
  //   }
  // }

}

