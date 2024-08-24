import { UserWithJobs } from '../user.service';

export interface IUserService {
  // updateUser(
  //   userId: number,
  //   dto: UpdateUserDto,
  // ): Promise<Omit<User, 'hashedPassword'>>;
  getUser(userId: number): Promise<UserWithJobs>;
}
