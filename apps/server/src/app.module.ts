import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GunsModule } from './modules/guns/guns.module';

@Module({
  imports: [
    // Connect to MongoDB
    MongooseModule.forRoot('mongodb://admin:password123@localhost:27017', {
      dbName: 'gun-wiki',
    }),
    GunsModule,
  ],
})
export class AppModule {}