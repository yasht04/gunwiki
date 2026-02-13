import { Injectable, NotFoundException } from '@nestjs/common';
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
  async deleteAll(): Promise<any> {
    return this.gunModel.deleteMany({}).exec();
  }
  async delete(id: string): Promise<any> {
  return this.gunModel.findByIdAndDelete(id).exec();
}

  async update(id: string, gun: any): Promise<any> {
    return this.gunModel.findByIdAndUpdate(id, gun, { new: true }).exec();
  }
  async findOne(id: string): Promise<Gun> {
    const gun = await this.gunModel.findById(id).exec();
    if (!gun) {
      throw new NotFoundException(`Gun #${id} not found`);
    }
    return gun;
  }
}