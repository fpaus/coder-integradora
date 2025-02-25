import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Pet } from '../../pets/entities/pet.entity';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Adoption {
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: Types.ObjectId | User;
  @Prop({ type: Types.ObjectId, ref: Pet.name })
  public pet: Types.ObjectId | Pet;
}

export type AdoptionsDocument = HydratedDocument<Adoption>;

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);
