import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  // UseGuards,
  Req,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JobService } from './job.service';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
// import { Task } from '@prisma/client';

// @UseGuards(AuthGuard('jwt'))
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  getJobs(): any {
    return [
      {
        date: 20240501,
        place: '中山競馬場',
        price: 10000,
        location: '1-1-1',
        time: 2,
      },
    ];
    return this.jobService.getJobs();
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
