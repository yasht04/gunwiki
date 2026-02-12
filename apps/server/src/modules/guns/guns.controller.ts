import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { GunsService } from './guns.service';
import { Delete } from '@nestjs/common';
@Controller('guns')
export class GunsController {
  constructor(private readonly gunsService: GunsService) {}

  @Post()
  create(@Body() createGunDto: any, @Headers('admin-secret') secret: string) {
    if (secret !== 'Viper') {
       throw new UnauthorizedException('Wrong password!'); 
    }
    return this.gunsService.create(createGunDto);
  }

  @Get()
  findAll() {
    return this.gunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gunsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('admin-secret') secret: string) {
    
    if (secret !== 'Viper') {
      throw new UnauthorizedException('Wrong password!');
    }

    return this.gunsService.delete(id);
  }
}
