import { UsersDocument } from '../entities/user.entity';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  petsAdopted: number;

  constructor(user: UsersDocument) {
    this.id = user._id.toString();
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.petsAdopted = user.pets.length;
  }

  public static fromEntity(user: UsersDocument): UserResponseDto {
    return new UserResponseDto(user);
  }
}
