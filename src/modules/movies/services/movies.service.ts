import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CATEGORIES, THE_MOVIE_DB_API } from 'src/shared/constants';
import { lastValueFrom, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { Watchlist } from '../entities/watchlist.entity';
import { IMovie, IWatchlistPorfile } from '../interfaces/watchlist';

@Injectable()
export class MoviesService {
  API_KEY = process.env.THE_MOVIE_DB_API_KEY;

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
  ) {}

  async getMoviesGroupedCategories() {
    try {
      const categoryNames = Object.keys(CATEGORIES);

      const requests = categoryNames.map((category) =>
        this.httpService
          .get(`${THE_MOVIE_DB_API}/3/discover/movie`, {
            params: {
              api_key: this.API_KEY,
              sort_by: 'popularity.desc',
              with_genres: CATEGORIES[category],
            },
          })
          .pipe(
            map((response) => {
              const results = response.data.results.map((movie) => ({
                id: movie.id,
                title: movie.original_title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                category: category,
              }));
              return { [category]: results };
            }),
          ),
      );

      const responses = await Promise.all(
        requests.map((req) => lastValueFrom(req)),
      );

      return responses.reduce((acc, res) => ({ ...acc, ...res }), {});
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPopularMoviesByCategory(category: string) {
    try {
      const url = `${THE_MOVIE_DB_API}/3/discover/movie?api_key=${this.API_KEY}&sort_by=popularity.desc&with_genres=${CATEGORIES[category]}`;

      return this.httpService.get(url).pipe(
        map((response) => {
          const resultMovies = response.data.results || [];
          return resultMovies.map((movie) => ({
            id: movie.id,
            title: movie.original_title,
            overview: movie.overview,
            poster_path: movie.poster_path,
          }));
        }),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async createEmptyWatchlist(body: IWatchlistPorfile) {
    const { profileId } = body;

    try {
      const profile = await this.profileRepository.findOne({
        where: { id: profileId },
      });

      if (!profile)
        return {
          message: 'Profile not found.',
          isError: true,
        };

      const watchlist = this.watchlistRepository.create({
        movies: [],
        profile,
      });

      const savedWatchlist = await this.watchlistRepository.save(watchlist);
      profile.watchlist = savedWatchlist;
      await this.profileRepository.save(profile);

      return {
        message: 'Watchlist created successfully.',
        isError: false,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findWatchlistByProfileId(body: IWatchlistPorfile) {
    const { profileId } = body;

    try {
      const id = profileId.replaceAll('"', '');

      return await this.watchlistRepository.findOne({
        where: { profile: { id } },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async addMovieToWatchlist(profileId: string, movie: IMovie) {
    try {
      const watchlist = await this.findWatchlistByProfileId({ profileId });

      if (!watchlist)
        return {
          message: 'Watchlist not found for the profile.',
          isError: true,
        };

      watchlist.movies.push({ ...movie, already_watched: false });

      await this.watchlistRepository.save(watchlist);

      return {
        message: 'Movie added to watch later.',
        isError: false,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async markMovieAsWatched({ profileId, movieId, alreadyWatched }: any) {
    try {
      const watchlist = await this.findWatchlistByProfileId({ profileId });

      if (!watchlist)
        return {
          message: 'Watchlist not found for the profile.',
          isError: true,
        };

      const movieIndex = watchlist.movies.findIndex(
        ({ id }: any) => id === Number(movieId),
      );

      if (movieIndex === -1)
        return {
          message: 'Movie not found in watchlist.',
          isError: true,
        };

      watchlist.movies[movieIndex].already_watched = alreadyWatched;

      await this.watchlistRepository.save(watchlist);

      return {
        message: `Movie marked as ${watchlist.movies[movieIndex].already_watched}.`,
        isError: false,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async searchMovieByTerm(term: string) {
    try {
      term = term.replaceAll('"', '');

      return this.httpService
        .get(`${THE_MOVIE_DB_API}/3/search/movie`, {
          params: {
            api_key: this.API_KEY,
            query: term,
          },
        })
        .pipe(
          map((response) => {
            const { results } = response.data;
            return results.map((movie) => ({
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: movie.poster_path,
            }));
          }),
        );
    } catch (err) {
      throw new Error('Failed to search movies.');
    }
  }
}
