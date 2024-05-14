import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service'; // JobService imported
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('JobController', () => {
  let controller: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
      controllers: [JobController],
      providers: [
        {
          provide: 'JobService',
          useClass: JobService,
        },
      ],
    }).compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
