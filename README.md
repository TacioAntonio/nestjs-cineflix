# [Nest.js API] Cineflix

![Image](images/nestjs.png)
> An API developed for a streaming application

# Angular application
Application repository that runs the Nest.js API:
- [[Angular] article-cineflix](https://github.com/TacioAntonio/angular-cineflix)

## Endpoints
- `{PROTOCOL}://{URL}:{PORT}/api`
## Movies
- **Search movie by term**:  GET - /search-movie?term="TERM"
- **Mark movie as watched**: PUT - /mark-movie-as-watched
- **Add movie to watchlist**: POST - /add-movie-watchlist?profileId="PROFILE_ID"
- **Get watchlist**: GET - /find-watchlist?profileId="PROFILE_ID"
- **Create watchlist**: POST - /create-watchlist
- **Get movie by category**: GET - /movie/category/:category
- **Get movies**:  GET - /movies

### Profiles
- **Create profile**: POST - /profile?user_token="USER_TOKEN"
- **Get profiles by id**: GET - /profile?user_id="USER_ID"

### Users
- **Sign in**: POST - /sign-in
- **Sign up**: POST - /create-user

## Installation
```sh
$ git clone https://github.com/TacioAntonio/nestjs-cineflix
$ cd nestjs-cineflix
$ npm i
```

## Running locally
```sh
$ npm start
```

## Running on docker
```sh
$ docker-compose up
```

## Contribution
Please read [CONTRIBUTING.md](https://github.com/TacioAntonio/nestjs-cineflix/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/TacioAntonio/nestjs-cineflix/tags).

## Authors
| ![Tácio Antônio](https://avatars2.githubusercontent.com/u/44682965?s=150&=4)
| -
| [Tácio Antônio](https://github.com/TacioAntonio/)

See also the list of [contributors](https://github.com/TacioAntonio/nestjs-cineflix/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/TacioAntonio/nestjs-cineflix/blob/master/LICENSE.md) file for details.