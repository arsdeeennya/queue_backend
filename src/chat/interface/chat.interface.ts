import { Chats } from '@prisma/client';

export interface IChatService {
  getChats(): Promise<Chats[]>;
}
