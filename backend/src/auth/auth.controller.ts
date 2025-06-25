import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username } = loginDto;
    const user = await this.collaboratorsService.findByUsername(username);

    if (!user) {
      throw new HttpException(
        { success: false, message: 'Usuário não encontrado' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Aqui você pode adicionar lógica de autenticação (senha, token, etc)
    // Para agora, vamos apenas responder com sucesso e os dados do usuário

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    };
  }
}
