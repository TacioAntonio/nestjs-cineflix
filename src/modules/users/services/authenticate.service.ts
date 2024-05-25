import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserSignInDTO } from '../dtos/usersDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userDTO: UserSignInDTO) {
    const { email, password } = userDTO;

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) return { message: 'Email is invalid.', isError: true };

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return { message: 'Password is invalid.', isError: true };

      const payload = {
        id: user.id,
        username: user.username,
        isAuth: true,
      };

      const token = this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.SECRET_KEY_SHA1,
      });

      return { token };
    } catch (err) {
      throw new Error(err);
    }
  }
}
