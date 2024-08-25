import { Applications } from '@prisma/client';
import { CreateApplicationDto } from '../dto/application.dto';

export interface IApplicationService {
  // getApplications(): Promise<Applications[]>;
  // updateJobById(userId: number, dto: UpdateJobDto): Promise<Job>;
  createApplication(
    userId: number,
    dto: CreateApplicationDto,
  ): Promise<Applications>;
  // deleteApplicationById(userId: number, dto: DeleteApplicationDto): Promise<void>;
}
