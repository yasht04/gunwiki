import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GunsService } from './guns.service';

@Controller('guns')
export class GunsController {
  constructor(private readonly gunsService: GunsService) {}

  @Post()
  create(@Body() createGunDto: any) {
    return this.gunsService.create(createGunDto);
  }

  @Get()
  findAll() {
    return this.gunsService.findAll();
  }

  // NEW: Route for getting one gun
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gunsService.findOne(id);
  }
}