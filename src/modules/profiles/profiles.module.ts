import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Profile } from '../profiles/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfileService } from './services/profiles.service';
import { JwtService } from '@nestjs/jwt';

const CONTROLLERS = [ProfilesController];
const SERVICES = [ProfileService, JwtService];

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), HttpModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class ProfilesModule {}
