import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateApplicantDto } from './dto/applicant.dto';
import { Applicants } from '@prisma/client';
// import { UpdateJobDto } from 'src/job/dto/update-job.dto';
import { Request } from 'express';

@Controller('applicant')
export class ApplicantController {
  constructor(
    @Inject('ApplicantService')
    private readonly applicantService: ApplicantService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getApplicants(): Promise<Applicants[]> {
    return this.applicantService.getApplicants();
  }

  //応募する
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createApplicant(
    @Req() req: Request,
    @Body() dto: CreateApplicantDto,
  ): Promise<Applicants> {
    return this.applicantService.createApplicant(req.user.id, dto);
  }

  // 採用
  // @Patch()
  // updateApplicant(@Body() dto: UpdateApplicantDto): Promise<void> {
  //   return this.applicantService.updateApplicant(dto);
  // }

  // // 不採用
  // @Patch('addRejectedId/')
  // addRejectedId(@Body() dto: UpdateJobAddRejectedIdDto): Promise<void> {
  //   return this.jobService.addRejectedId(dto);
  // }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(AuthGuard('jwt'))
  // @Delete()
  // deleteJobById(@Req() req: Request, @Body() dto: DeleteJobDto): Promise<void> {
  //   return this.jobService.deleteJobById(req.user.id, dto);
  // }
}
