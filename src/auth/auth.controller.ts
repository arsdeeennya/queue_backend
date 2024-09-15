import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}

  @Get('/csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    // jwt生成
    const jwt = await this.authService.login(dto);
    // jwtをcookieに設定
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: false,
      secure: true, // Marks the cookie to be used with HTTPS only.
      sameSite: 'none', // noneにすると異なるドメイン間でcookieが使える。するとchromeではsecureをtrueにする必要がある(trueにするとhttpsのみでcookieが扱える)
      path: '/',
    });
    return {
      message: 'ok',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ok',
    };
  }
}
