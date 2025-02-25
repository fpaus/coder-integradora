import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  public firstName: string;
  @IsString()
  public lastName: string;
  @IsString()
  public password: string;
}
