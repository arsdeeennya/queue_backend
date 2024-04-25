import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // why does it inculede  user object in request(probabury by AuthGUard?? read doc!!)
  getLoginUser(@Req() req: Request): any {
    console.log(222, req.user);
    return req.user;
  }

  @Patch()
  updateUser(@Req() req: Request, @Body() dto: UpdateUserDto): any {
    return this.userService.updateUser(3, dto);
  }
}
