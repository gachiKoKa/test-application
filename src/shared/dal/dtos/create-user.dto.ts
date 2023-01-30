import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsPhoneNumber('UA')
  @IsString()
  public readonly phone: string;
}
