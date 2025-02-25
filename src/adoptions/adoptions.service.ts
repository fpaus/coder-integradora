import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import './dto/update-adoption.dto';

import { PetsService } from '../pets/pets.service';
import { UsersService } from '../users/users.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Adoption } from './entities/adoption.entity';

@Injectable()
export class AdoptionsService {
  constructor(
    @InjectModel(Adoption.name) private petModel: Model<Adoption>,
    private readonly usersService: UsersService,
    private readonly petsService: PetsService,
  ) {}

  async create(createAdoptionDto: CreateAdoptionDto) {
    const user = await this.usersService.findOne(createAdoptionDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const pet = await this.petsService.findOne(createAdoptionDto.petId);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    if (pet.isAdopted) {
      throw new BadRequestException('Pet already adopted');
    }
    user.pets.push(pet);
    pet.isAdopted = true;
    pet.owner = user;
    await user.save();
    await pet.save();
    return this.petModel.create(createAdoptionDto);
  }

  findAll() {
    return this.petModel.find();
  }

  findOne(id: string) {
    return this.petModel.findById(id);
  }
}
