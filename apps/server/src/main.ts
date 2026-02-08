import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allows Frontend to talk to Backend
  await app.listen(4000); // <-- THIS MUST BE 4000
}
bootstrap();