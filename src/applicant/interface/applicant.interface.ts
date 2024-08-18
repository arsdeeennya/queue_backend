import { Applicants } from '@prisma/client';
import { CreateApplicantDto } from '../dto/applicant.dto';

export interface IApplicantService {
  // getApplicants(): Promise<Applicants[]>;
  // updateJobById(userId: number, dto: UpdateJobDto): Promise<Job>;
  createApplicant(userId: number, dto: CreateApplicantDto): Promise<Applicants>;
  // deleteApplicantById(userId: number, dto: DeleteApplicantDto): Promise<void>;
}
