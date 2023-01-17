import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
