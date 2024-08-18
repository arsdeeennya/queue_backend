import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  // updateUser(
  //   userId: number,
  //   dto: UpdateUserDto,
  // ): Promise<Omit<User, 'hashedPassword'>>;
  getUser(userId: number): Promise<any>;
}
