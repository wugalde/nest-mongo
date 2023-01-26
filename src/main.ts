import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v2/')
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    })
  );
  

  await app.listen(process.env.PORT || 3001);
  console.log(`App runing on port on ${process.env.PORT || 3001}`);
}
bootstrap();
