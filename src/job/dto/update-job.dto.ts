import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;
}

export class UpdateJobDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}

export class UpdateJobAddAcceptedIdDto {
  @IsNumber()
  @IsNotEmpty()
  acceptedId: number;

  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsNumber()
  @IsNotEmpty()
  notificationId: number;
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
