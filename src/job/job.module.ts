import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  // imports: [],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
