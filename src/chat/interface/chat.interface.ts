import { Chat } from '@prisma/client';

export interface IChatService {
  getChats(): Promise<Chat[]>;
}
