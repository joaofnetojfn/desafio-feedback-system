import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collaborator } from './entities/collaborator.entity';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectModel(Collaborator)
    private collaboratorModel: typeof Collaborator,
  ) {}

  findAll(): Promise<Collaborator[]> {
    return this.collaboratorModel.findAll();
  }
  async findByUsername(username: string) {
    return this.collaboratorModel.findOne({ where: { username } });
  }
}
