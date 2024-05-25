import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  Length,
  Matches,
} from '@nestjs/class-validator';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Username must contain only letters (uppercase or lowercase)',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50, { message: 'The email must have a maximum of 50 characters.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&).',
    },
  )
  password: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;
}

export class UserSignInDTO extends OmitType(CreateUserDto, [
  'username',
  'birthdate',
] as const) {}
