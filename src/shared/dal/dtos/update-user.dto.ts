import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly password?: string;
}
