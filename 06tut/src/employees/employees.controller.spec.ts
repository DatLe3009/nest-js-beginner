import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseModule } from '../database/database.module';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
