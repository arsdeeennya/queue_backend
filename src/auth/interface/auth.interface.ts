import { AuthDto } from '../dto/auth.dto';
import { User } from '@prisma/client';

export interface Msg {
  message: string;
}
export interface Csrf {
  csrfToken: string;
}
export interface Jwt {
  accessToken: string;
}

export interface IAuthService {
  signUp(dto: AuthDto): Promise<Msg>;
  login(dto: AuthDto): Promise<Jwt>;
  generateJwt(userId: number, email: string): Promise<Jwt>;
}

export interface IJwtStrategy {
  validate(payload: { sub: number; email: string }): Promise<User>;
}
