import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Job } from '@prisma/client';
// import { Task } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  getJobs(): Promise<Job[]> {
    return this.prisma.job.findMany();
  }
  // return this.prisma.job.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  // });
  // return [
  //   {
  //     date: 20240501,
  //     place: '中山競馬場',
  //     price: 10000,
  //     location: '1-1-1',
  //     time: 2,
  //   },
  // ];
  // getTasks(userId: number): Promise<Task[]> {
  //   return this.prisma.task.findMany({
  //     where: {
  //       userId,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });
  // }
  // getTaskById(userId: number, taskId: number): Promise<Task> {
  //   return this.prisma.task.findFirst({
  //     where: {
  //       userId,
  //       id: taskId,
  //     },
  //   });
  // }

  // async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
  //   const task = await this.prisma.task.create({
  //     data: {
  //       userId,
  //       ...dto,
  //     },
  //   });
  //   return task;
  // }

  // async updateTaskById(
  //   userId: number,
  //   taskId: number,
  //   dto: UpdateTaskDto,
  // ): Promise<Task> {
  //   const task = await this.prisma.task.findUnique({
  //     where: {
  //       id: taskId,
  //     },
  //   });

  //   if (!task || task.userId !== userId)
  //     throw new ForbiddenException('No permission to update');

  //   return this.prisma.task.update({
  //     where: {
  //       id: taskId,
  //     },
  //     data: {
  //       ...dto,
  //     },
  //   });
  // }
  // async deleteTaskById(userId: number, taskId: number): Promise<void> {
  //   const task = await this.prisma.task.findUnique({
  //     where: {
  //       id: taskId,
  //     },
  //   });

  //   if (!task || task.userId !== userId)
  //     throw new ForbiddenException('No permission to delete');

  //   await this.prisma.task.delete({
  //     where: {
  //       id: taskId,
  //     },
  //   });
  // }
}
