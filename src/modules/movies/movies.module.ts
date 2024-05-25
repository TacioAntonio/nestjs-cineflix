import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';

const CONTROLLERS = [MoviesController];
const SERVICES = [MoviesService, JwtService];

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist, Profile]), HttpModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class MoviesModule {}
