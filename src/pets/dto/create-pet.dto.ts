import { IsDateString, IsEnum, IsString } from 'class-validator';

export enum Specie {
  Dog = 'dog',
  Cat = 'cat',
  Bird = 'bird',
}

export class CreatePetDto {
  @IsDateString()
  public birthDate: Date;
  @IsString()
  public name: string;
  @IsString()
  @IsEnum(Specie)
  public specie: Specie;
}
