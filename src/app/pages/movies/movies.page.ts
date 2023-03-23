import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SPINNERS } from '@ionic/core/dist/types/components/spinner/spinner-configs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from './../../services/movie.service';
import { InfiniteScrollCustomEvent } from '@ionic/core';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: Movie[] = []; // this is the array of movies
  currentPage = 1;

  constructor(
    private movieService: MovieService,
    private loadingCtr: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtr.create({
      message: 'Loading Movies',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService
      .getPopularMovies(this.currentPage)
      .subscribe((res: any) => {
        loading.dismiss();
        //this.movies = [...this.movies, ...res.results];
        this.movies.push(...res.results);
        console.log(res);

        if (event) {
          event.target.complete();
        }
      });
  }

  loadMore(event?: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);

  }

}
