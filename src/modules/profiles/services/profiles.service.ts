import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto } from '../dtos/profileDTO';
import { jwtDecode } from 'jwt-decode';
import { NUMBER_PROFILES_ALLOWED } from 'src/shared/constants';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(user_token: string, createProfileDto: CreateProfileDto) {
    const user = jwtDecode(user_token);
    const { id, username }: any = user;

    try {
      const profilesCount: any = await this.findAllProfilesByUserId(id);

      if (profilesCount.length >= NUMBER_PROFILES_ALLOWED)
        return {
          message: 'Maximum profile limit reached.',
          isError: true,
        };

      const profile = this.profileRepository.create({
        ...createProfileDto,
        user: { id, username },
        watchlist: null,
      });

      return await this.profileRepository.save(profile);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAllProfilesByUserId(id: string) {
    if (!id) return { message: 'Id not found.' };

    try {
      id = id.replaceAll('"', '');

      const profiles = await this.profileRepository.find({
        where: { user: { id } },
      });

      if (!profiles) {
        throw new NotFoundException(`No profiles found for user with ID ${id}`);
      }

      return profiles;
    } catch (err) {
      throw new Error(err);
    }
  }
}
