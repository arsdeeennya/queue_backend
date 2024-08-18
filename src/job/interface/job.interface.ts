import { Job } from '@prisma/client';
import {
  CreateJobDto,
  DeleteJobDto,
  // UpdateJobDto,
} from '../dto/update-job.dto';

export interface IJobService {
  getJobs(): Promise<Job[]>;
  // updateJobById(userId: number, dto: UpdateJobDto): Promise<Job>;
  createJob(userId: number, dto: CreateJobDto): Promise<Job>;
  deleteJobById(userId: number, dto: DeleteJobDto): Promise<void>;
}
