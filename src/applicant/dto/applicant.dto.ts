import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateApplicantDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}

export class UpdateJobDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}

export class UpdateApplicantDto {
  @IsNumber()
  @IsNotEmpty()
  applicantId: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

export class UpdateJobAddRejectedIdDto {
  @IsNumber()
  @IsNotEmpty()
  rejectedId: number;

  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsNumber()
  @IsNotEmpty()
  noticeId: number;
}

export class DeleteJobDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}
