import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Collaborator } from './collaborator.model';

@Table
export class Feedback extends Model<Feedback> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ENUM('public', 'private'),
    allowNull: false,
  })
  type: 'public' | 'private';

  @ForeignKey(() => Collaborator)
  @Column
  senderId: number;

  @BelongsTo(() => Collaborator, 'senderId')
  sender: Collaborator;

  @ForeignKey(() => Collaborator)
  @Column
  recipientId: number;

  @BelongsTo(() => Collaborator, 'recipientId')
  recipient: Collaborator;
}
