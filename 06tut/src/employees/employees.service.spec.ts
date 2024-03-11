import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { DatabaseModule } from '../database/database.module';


describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [EmployeesService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
