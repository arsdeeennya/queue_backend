import { AuthDto } from '../dto/auth.dto';

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
