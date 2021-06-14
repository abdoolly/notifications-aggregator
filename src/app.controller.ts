import { Controller, Get, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ApiOkResponse } from '@nestjs/swagger';
@Controller()
export class AppController {

  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) { }


  @Get('/health')
  @ApiOkResponse()
  async health() {
    return await this.sequelize.authenticate();
  }

}
