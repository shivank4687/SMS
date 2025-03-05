import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity
} from 'typeorm';

export class BaseEntity  {

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz'})
  deletedAt!: Date;
}