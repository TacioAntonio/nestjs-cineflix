import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/usersDTO';
import { User } from '../entities/user.entity';
import { ValidationsService } from './validations.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly validationsService: ValidationsService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password, birthdate } = createUserDto;

    try {
      const isEmailUnique = await this.validationsService.isEmailUnique(email);

      if (!isEmailUnique)
        return { message: 'Email already exists.', isError: true };

      const user = this.userRepository.create({
        username,
        email,
        password,
        birthdate,
      });

      return this.userRepository.save(user);
    } catch (err) {
      throw new Error(err);
    }
  }
}

// getMovies() {
//   try {
//     //   const articles = await this.articleRepository.find();
//     const articles = [1, 2, 3];
//     return articles;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// async searchMovies(query: string): Promise<any> {
//   const apiKey = 'YOUR_API_KEY';
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
//   const response: AxiosResponse<any> = await this.axiosService.get(url);
//   return response.data;
// }
