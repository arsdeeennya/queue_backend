import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}

export class UpdateJobDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}

export class UpdateApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  applicationId: number;

  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsNumber()
  @IsNotEmpty()
  applicationUserId: number;
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
  notificationId: number;
}

export class DeleteJobDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}
