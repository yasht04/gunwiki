import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GunDocument = HydratedDocument<Gun>;

@Schema({ timestamps: true })
export class Gun {
  @Prop({ required: true })
  name: string;

  @Prop()
  manufacturer: string;

  @Prop()
  description: string;

  @Prop()
  image_url: string;

  @Prop({ type: Object })
  specs: {
    caliber: string;
    weight: string;
    length: string;
    action: string;
  };
}

export const GunSchema = SchemaFactory.createForClass(Gun);