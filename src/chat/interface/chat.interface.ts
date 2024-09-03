import { Chats } from '@prisma/client';

export interface IChatService {
  getChats(id: string): Promise<Chats[]>;
}
