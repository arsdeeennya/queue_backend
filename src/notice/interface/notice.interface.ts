import { Notice } from '@prisma/client';
import { CreateNoticeDto } from '../dto/create-notice.dto';

export interface INoticeService {
  getNoticesReadCheck(userId: number, read: boolean): Promise<Notice[]>;
  createNotice(userId: number, dto: CreateNoticeDto): Promise<void>;
}
