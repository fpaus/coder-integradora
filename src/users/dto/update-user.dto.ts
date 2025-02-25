import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../sessions/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
