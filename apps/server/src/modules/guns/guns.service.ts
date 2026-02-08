import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gun } from '../../schemas/gun.schema';

@Injectable()
export class GunsService {
  constructor(@InjectModel(Gun.name) private gunModel: Model<Gun>) {}

  async create(createGunDto: any): Promise<Gun> {
    const createdGun = new this.gunModel(createGunDto);
    return createdGun.save();
  }

  async findAll(): Promise<Gun[]> {
    return this.gunModel.find().exec();
  }
}