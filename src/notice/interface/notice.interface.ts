import { Notice } from '@prisma/client';
import { CreateNoticeDto } from '../dto/create-notice.dto';

export interface INoticeService {
  getNotices(userId: number): Promise<Notice[]>;
  createNotice(userId: number, dto: CreateNoticeDto): Promise<void>;
}
