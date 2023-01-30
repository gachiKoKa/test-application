import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly password?: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  public readonly phone?: string;
}
