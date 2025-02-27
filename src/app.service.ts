import { Injectable } from '@nestjs/common';
import { PetsService } from './pets/pets.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly petsService: PetsService,
    private readonly usersService: UsersService,
  ) {}

  async getAllUsers() {
    return this.usersService.findAll();
  }

  async getAllNonAdoptedPets() {
    return this.petsService.findAll({ adopted: false });
  }
}
