import { Jobs } from '@prisma/client';
import {
  CreateJobDto,
  DeleteJobDto,
  // UpdateJobDto,
} from '../dto/update-job.dto';

export interface IJobService {
  getJobs(): Promise<Jobs[]>;
  // updateJobById(userId: number, dto: UpdateJobDto): Promise<Job>;
  createJob(userId: number, dto: CreateJobDto): Promise<Jobs>;
  deleteJobById(userId: number, dto: DeleteJobDto): Promise<void>;
}
