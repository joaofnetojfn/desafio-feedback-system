import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CollaboratorsModule } from '../collaborators/collaborators.module';

@Module({
  imports: [CollaboratorsModule],
  controllers: [AuthController],
})
export class AuthModule {}
