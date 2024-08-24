import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // getUser(@Req() req: Request): Promise<UserWithJobs> {
  //   return this.appService.getUser(req.user.id);
  // }
}
