import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PetsModule } from '../pets/pets.module';
import { UsersModule } from '../users/users.module';
import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';
import { Adoption, AdoptionSchema } from './entities/adoption.entity';

@Module({
  imports: [
    UsersModule,
    PetsModule,
    MongooseModule.forFeature([
      {
        name: Adoption.name,
        schema: AdoptionSchema,
      },
    ]),
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
