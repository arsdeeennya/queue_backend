import { Module } from '@nestjs/common';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicantController],
  providers: [
    {
      provide: 'ApplicantService',
      useClass: ApplicantService,
    },
  ],
})
export class ApplicantModule {}
