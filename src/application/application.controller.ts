import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService, ApplicationsWithJob } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Applications } from '@prisma/client';
// import { UpdateJobDto } from 'src/job/dto/update-job.dto';
import { Request } from 'express';

@Controller('application')
export class ApplicationController {
  constructor(
    @Inject('ApplicationService')
    private readonly applicationService: ApplicationService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getApplications(@Req() req: Request): Promise<ApplicationsWithJob[]> {
    return this.applicationService.getApplications(req.user.id);
  }

  //応募する
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createApplication(
    @Req() req: Request,
    @Body() dto: CreateApplicationDto,
  ): Promise<Applications> {
    return this.applicationService.createApplication(req.user.id, dto);
  }

  // 採用
  @UseGuards(AuthGuard('jwt'))
  @Patch('updateStatus')
  updateApplication(@Body() dto: UpdateApplicationDto): Promise<void> {
    return this.applicationService.updateApplication(dto);
  }

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
