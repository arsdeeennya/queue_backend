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
  notificationId: number;

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
  notificationId: number;
}

export class DeleteJobDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}
