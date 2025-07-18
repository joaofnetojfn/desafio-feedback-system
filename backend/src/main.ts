import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS para todas origens (localhost:8080 inclusive)
  app.enableCors({
    origin: 'http://localhost:8080',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
