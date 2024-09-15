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
import { ApplicationService, ApplicationModel } from './application.service';
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
  getApplications(@Req() req: Request): Promise<ApplicationModel[]> {
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
  @Patch()
  updateApplication(
    @Req() req: Request,
    @Body() dto: UpdateApplicationDto,
  ): Promise<void> {
    return this.applicationService.updateApplication(req.user.id, dto);
  }

  // キャンセル
  @UseGuards(AuthGuard('jwt'))
  @Patch('cancel')
  cancelApplication(
    @Req() req: Request,
    @Body() dto: { jobId: number },
  ): Promise<void> {
    return this.applicationService.cancelApplication(req.user.id, dto.jobId);
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
