import { IsDefined, IsEmail, MinLength } from 'class-validator';

export default class loginDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @MinLength(8)
  @IsDefined()
  password: string;
}
