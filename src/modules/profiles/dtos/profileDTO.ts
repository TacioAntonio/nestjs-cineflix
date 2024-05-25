import { Length, Matches, IsString } from '@nestjs/class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Name must contain only letters (uppercase or lowercase)',
  })
  name: string;
}
