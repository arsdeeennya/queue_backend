import { Chats } from '@prisma/client';

export interface IChatService {
  getChats(id: string, userId: number): Promise<Chats[]>;
}
