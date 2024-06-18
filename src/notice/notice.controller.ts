import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  // UseGuards,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NoticeService } from './notice.service';
import { Job, Notice } from '@prisma/client';
// import { CreateJobDto, DeleteJobDto, UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Controller('notice')
@UseGuards(AuthGuard('jwt'))
export class NoticeController {
  constructor(
    @Inject('NoticeService')
    private readonly noticeService: NoticeService,
  ) {}

  @Get('getNotices/')
  getNotices(@Req() req: Request): Promise<Notice[]> {
    return this.noticeService.getNotices(req.user.id);
  }

  @Get('read/:read')
  getNoticesReadCheck(
    @Req() req: Request,
    @Param('read', ParseBoolPipe) read: boolean,
  ): Promise<Notice[]> {
    return this.noticeService.getNoticesReadCheck(req.user.id, read);
  }

  @Patch()
  updateNoticesById(@Req() req: Request): Promise<void> {
    return this.noticeService.updateNoticesById(req.user.id);
  }
  // こんなふうに, 既読チェックする
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

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createNotice(@Req() req: Request, @Body() dto: CreateNoticeDto): void {
    this.noticeService.createNotice(req.user.id, dto);
  }
}
