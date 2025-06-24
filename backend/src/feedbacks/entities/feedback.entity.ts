import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';

export enum FeedbackType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Table({ tableName: 'feedbacks' })
export class Feedback extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @Column({
    type: DataType.ENUM('public', 'private'),
    allowNull: false,
    defaultValue: 'public',
  })
  declare type: FeedbackType;

  @ForeignKey(() => Collaborator)
  @Column({ type: DataType.UUID, allowNull: false })
  declare senderId: string;

  @ForeignKey(() => Collaborator)
  @Column({ type: DataType.UUID, allowNull: false })
  declare receiverId: string;

  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}
