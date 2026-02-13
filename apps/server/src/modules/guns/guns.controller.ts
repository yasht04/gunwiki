import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException, Put } from '@nestjs/common';
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
  // Import 'Put' at the top: import { ..., Put } from '@nestjs/common';

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGunDto: any, @Headers('admin-secret') secret: string) {
    if (secret !== 'MY_SUPER_SECRET_CODE_123') {
      throw new UnauthorizedException('Wrong password!');
    }
    return this.gunsService.update(id, updateGunDto);
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
