import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CollaboratorsModule } from './collaborators/collaborators.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Faz o ConfigModule estar disponível em toda a aplicação
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], // Importa o ConfigModule aqui para poder usar o ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: false,
        logging: false,
      }),
    }),
    CollaboratorsModule,
    FeedbacksModule,
    AuthModule,
  ],
})
export class AppModule {}
