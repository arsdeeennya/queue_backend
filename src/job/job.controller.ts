import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  // Param,
  // ParseIntPipe,
  // Patch,
  Post,
  // UseGuards,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JobService, JobModel } from './job.service';
import { Jobs } from '@prisma/client';
import {
  CreateJobDto,
  DeleteJobDto,
  // UpdateJobAddAcceptedIdDto,
  // UpdateJobAddRejectedIdDto,
  // UpdateJobDto,
} from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
// import { Task } from '@prisma/client';

@Controller('job')
export class JobController {
  constructor(
    @Inject('JobService')
    private readonly jobService: JobService,
  ) {}
  @Get()
  getJobs(): Promise<JobModel[]> {
    return this.jobService.getJobs();
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createJob(@Req() req: Request, @Body() dto: CreateJobDto): Promise<Jobs> {
    return this.jobService.createJob(req.user.id, dto);
  }

  // //応募する
  // @UseGuards(AuthGuard('jwt'))
  // @Patch()
  // updateJobById(
  //   @Req() req: Request,
  //   @Body() dto: UpdateJobDto,
  // ): Promise<Applications> {
  //   return this.jobService.updateJobById(req.user.id, dto);
  // }

  // // 採用
  // @Patch('addAcceptedId/')
  // addAcceptedId(@Body() dto: UpdateJobAddAcceptedIdDto): Promise<void> {
  //   return this.jobService.addAcceptedId(dto);
  // }

  // // 不採用
  // @Patch('addRejectedId/')
  // addRejectedId(@Body() dto: UpdateJobAddRejectedIdDto): Promise<void> {
  //   return this.jobService.addRejectedId(dto);
  // }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteJobById(@Req() req: Request, @Body() dto: DeleteJobDto): Promise<void> {
    return this.jobService.deleteJobById(req.user.id, dto);
  }
  // @Get()
  // getTasks(@Req() req: Request): Promise<Task[]> {
  //   return this.todoService.getTasks(req.user.id);
  // }

  // @Get(':id')
  // getTaskById(
  //   @Req() req: Request,
  //   @Param('id', ParseIntPipe) taskId: number,
  // ): Promise<Task> {
  //   return this.todoService.getTaskById(req.user.id, taskId);
  // }

  // @Post()
  // createTask(@Req() req: Request, @Body() dto: CreateTaskDto): Promise<Task> {
  //   return this.todoService.createTask(req.user.id, dto);
  // }

  // @Patch(':id')
  // updateTaskById(
  //   @Req() req: Request,
  //   @Param('id', ParseIntPipe) taskId: number,
  //   @Body() dto: UpdateTaskDto,
  // ): Promise<Task> {
  //   return this.todoService.updateTaskById(req.user.id, taskId, dto);
  // }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete(':id')
  // deleteTaskById(
  //   @Req() req: Request,
  //   @Param('id', ParseIntPipe) taskId: number,
  // ): Promise<void> {
  //   return this.todoService.deleteTaskById(req.user.id, taskId);
  // }
}
