import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UserSignInDTO } from '../dtos/usersDTO';
import { AuthenticateService } from '../services/authenticate.service';

@Controller()
export class UsersController {
  constructor(
    private readonly authenticateService: AuthenticateService,
    private readonly userService: UsersService,
  ) {}

  @Post('create-user')
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Post('sign-in')
  signIn(@Body() userDto: UserSignInDTO) {
    return this.authenticateService.signIn(userDto);
  }
}
