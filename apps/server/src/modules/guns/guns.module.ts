import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GunsService } from './guns.service';
import { GunsController } from './guns.controller';
import { Gun, GunSchema } from '../../schemas/gun.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gun.name, schema: GunSchema }])
  ],
  controllers: [GunsController],
  providers: [GunsService],
})
export class GunsModule {}