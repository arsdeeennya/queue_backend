import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService, UserWithJobs } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    @Inject('UserService')
    private readonly userService: UserService,
  ) {}

  // @Get() // why does it inculede  user object in request(probabury by AuthGUard?? read doc!!)
  // getLoginUser(@Req() req: Request): User {
  //   console.log(6666666);
  //   return req.user as User;
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUser(@Req() req: Request): Promise<UserWithJobs> {
    return this.userService.getUser(req.user.id);
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<Users, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}
