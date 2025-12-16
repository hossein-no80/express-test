import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateUserDto {
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsDefined()
  password: string;

  @IsDefined()
  age?: number;
}

export default CreateUserDto;
