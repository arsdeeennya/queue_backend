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
  Patch,
  Post,
  // UseGuards,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JobService } from './job.service';
import { Job } from '@prisma/client';
import { CreateJobDto, DeleteJobDto, UpdateJobDto } from './dto/update-job.dto';
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
  getJobs(): Promise<Job[]> {
    return this.jobService.getJobs();
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createJob(@Req() req: Request, @Body() dto: CreateJobDto): Promise<Job> {
    return this.jobService.createJob(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  updateJobById(@Req() req: Request, @Body() dto: UpdateJobDto): Promise<Job> {
    return this.jobService.updateJobById(req.user.id, dto);
  }

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
