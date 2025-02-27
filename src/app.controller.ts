import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {}

  @Get('view-users')
  @Render('users')
  async viewUsers() {
    return { users: await this.appService.getAllUsers() };
  }

  @Get('view-pets')
  @Render('pets')
  async viewPets() {
    return { pets: await this.appService.getAllNonAdoptedPets() };
  }
}
