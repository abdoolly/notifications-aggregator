import { Controller, Get, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Controller()
export class AppController {

  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) { }

  @Get('/health')
  async health() {
    return await this.sequelize.authenticate();
  }

}
