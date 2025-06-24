import { FeedbackType } from '../entities/feedback.entity';

export class CreateFeedbackDto {
  title: string;
  description: string;
  type: FeedbackType;
  senderId: string;
  receiverId: string;
  createdAt?: Date;
}
