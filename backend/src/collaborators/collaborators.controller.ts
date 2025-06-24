import { Controller, Get } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly service: CollaboratorsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }
}
