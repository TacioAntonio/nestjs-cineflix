import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProfileService } from '../services/profiles.service';
import { CreateProfileDto } from '../dtos/profileDTO';
import { AuthenticateGuard } from 'src/guards/authenticate.guard';

@Controller()
export class ProfilesController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthenticateGuard)
  @Get('profile')
  getProfilesById(@Query('user_id') user_id: string) {
    return this.profileService.findAllProfilesByUserId(user_id);
  }

  @UseGuards(AuthenticateGuard)
  @Post('profile')
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Query('user_token') user_token: string,
  ) {
    return this.profileService.createProfile(user_token, createProfileDto);
  }
}
