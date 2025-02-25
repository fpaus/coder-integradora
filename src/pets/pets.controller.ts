import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, getSchemaPath } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Post('/with-image')
  @UseInterceptors(
    FileInterceptor('image', {
      preservePath: true,
      storage: diskStorage({
        destination: './public/img',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create pet with image',
    schema: {
      type: 'object',
      allOf: [
        { $ref: getSchemaPath(CreatePetDto) },
        {
          properties: {
            image: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      ],
    },
  })
  createWithImage(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.petsService.createWithImage(createPetDto, image);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':petId')
  findOne(@Param('petId') petId: string) {
    return this.petsService.findOne(petId);
  }

  @Delete(':petId')
  remove(@Param('petId') petId: string) {
    return this.petsService.remove(petId);
  }

  @Patch(':petId')
  update(@Param('petId') petId: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(petId, updatePetDto);
  }
}
