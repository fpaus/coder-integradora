import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '../../users/entities/user.entity';

@Schema()
export class Pet {
  @Prop({ default: false })
  adopted: boolean;
  @Prop()
  public birthDate: Date;
  @Prop()
  public image: string;

  @Prop({ default: false })
  public isAdopted: boolean;
  @Prop({ required: true })
  public name: string;
  @Prop({
    type: Types.ObjectId,
    ref: User?.name ?? 'User',
  })
  public owner: Types.ObjectId | User;
  @Prop({ required: true })
  public specie: string;
}

export type PetsDocument = HydratedDocument<Pet>;

export const PetSchema = SchemaFactory.createForClass(Pet);
