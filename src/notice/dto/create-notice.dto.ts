import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNoticeDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}
