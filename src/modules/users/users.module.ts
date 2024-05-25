import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationsService } from './services/validations.service';
import { AuthenticateService } from './services/authenticate.service';
import { JwtService } from '@nestjs/jwt';

const CONTROLLERS = [UsersController];
const SERVICES = [
  UsersService,
  ValidationsService,
  AuthenticateService,
  JwtService,
];

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User]), HttpModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class UsersModule {}
