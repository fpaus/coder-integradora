import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<Pet>) {}

  create(createPetDto: CreatePetDto) {
    return this.petModel.create(createPetDto);
  }

  createWithImage(createPetDto: CreatePetDto, image: Express.Multer.File) {
    return this.petModel.create({ ...createPetDto, image: image.filename });
  }

  findAll() {
    return this.petModel.find();
  }

  findOne(id: string) {
    return this.petModel.findById(id);
  }

  remove(id: string) {
    return this.petModel.findByIdAndDelete(id);
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    return this.petModel.findByIdAndUpdate(id, updatePetDto, { new: true });
  }
}
