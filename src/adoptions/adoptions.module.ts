import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';
import { Adoption, AdoptionSchema } from './entities/adoption.entity';
import { PetsModule } from 'src/pets/pets.module';
import { UsersModule } from 'src/users/users.module';

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
