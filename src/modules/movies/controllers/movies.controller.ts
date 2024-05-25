import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { IMovie } from '../interfaces/watchlist';
import { AuthenticateGuard } from 'src/guards/authenticate.guard';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthenticateGuard)
  @Get('movies')
  getMovies() {
    return this.moviesService.getMoviesGroupedCategories();
  }

  @UseGuards(AuthenticateGuard)
  @Get('movie/category/:category')
  getPopularMoviesByCategory(@Param('category') category: string) {
    return this.moviesService.getPopularMoviesByCategory(category);
  }

  @UseGuards(AuthenticateGuard)
  @Post('create-watchlist')
  createEmptyWatchlist(@Body() body: { profileId: string }) {
    return this.moviesService.createEmptyWatchlist(body);
  }

  @UseGuards(AuthenticateGuard)
  @Get('find-watchlist')
  findWatchlistByProfileId(@Query('profileId') profileId: string) {
    return this.moviesService.findWatchlistByProfileId({ profileId });
  }

  @UseGuards(AuthenticateGuard)
  @Post('add-movie-watchlist')
  addMovieToWatchlist(
    @Query('profileId') profileId: string,
    @Body() movie: IMovie,
  ) {
    return this.moviesService.addMovieToWatchlist(profileId, movie);
  }

  @UseGuards(AuthenticateGuard)
  @Put('mark-movie-as-watched')
  markMovieAsWatched(
    @Body()
    body: {
      profileId: string;
      movieId: string;
      alreadyWatched: boolean;
    },
  ) {
    return this.moviesService.markMovieAsWatched(body);
  }

  @UseGuards(AuthenticateGuard)
  @Get('search-movie')
  searchMovieByTerm(@Query('term') term: string) {
    return this.moviesService.searchMovieByTerm(term);
  }
}
