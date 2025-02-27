import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Pet } from '../../pets/entities/pet.entity';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  public firstName: string;

  // @Prop({
  //   type: [
  //     {
  //       name: { type: String, required: true },
  //       reference: { type: String, required: true },
  //     },
  //   ],
  //   default: [],
  // })
  // public documents: { name: string; reference: string }[];

  @Prop({ type: Date, default: Date.now })
  public lastConnection: Date;
  @Prop({ required: true })
  public lastName: string;
  @Prop({ required: true })
  public password: string;
  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, ref: Pet?.name ?? 'Pet' },
      },
    ],
    default: [],
  })
  public pets: { _id: Types.ObjectId }[] | Pet[];
  @Prop({ default: 'user' })
  public role: string;
}

export type UsersDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
