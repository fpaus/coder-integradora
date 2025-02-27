import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  public first_name: string;
  @IsString()
  public last_name: string;
  @IsString()
  public password: string;
}
