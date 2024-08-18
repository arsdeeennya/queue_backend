import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService, UserWithJobs } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUser(@Req() req: Request): Promise<UserWithJobs> {
    return this.appService.getUser(req.user.id);
  }
}
