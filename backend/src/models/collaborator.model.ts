import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Feedback } from './feedback.model';

@Table
export class Collaborator extends Model<Collaborator> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Feedback)
  feedbacksSent: Feedback[];

  @HasMany(() => Feedback, 'recipientId')
  feedbacksReceived: Feedback[];
}
