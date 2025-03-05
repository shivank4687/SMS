import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@Entity({name:'users'})
@Index(['email'], { unique: true }) // Unique index on the `email` column
@Index(['username'], { unique: true }) // Unique index on the `username` column
// @Index(['phone_number']) // Non-unique index on the `phone_number` column
// @Index(['role_id']) // Non-unique index on the `role_id` column
// @Index(['status']) // Non-unique index on the `status` column
// @Index(['first_name', 'last_name']) // Composite index on `first_name` and `last_name`
// @Index('IDX_USER_EMAIL', ['email'], { unique: true }) // Custom index name
export class User extends BaseEntity {
 
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'joe' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  photo_url: string;

  @ManyToOne(() => Role, (role) => role.users) // Many-to-One relationship with Role
  @JoinColumn({ name: 'role_id' }) // Specifies the foreign key column
  role: Role; // This will store the Role entity

  @Column({ type: "enum", enum: ['active', 'inactive', 'suspended'], default: 'active' })
  status: string;
  

}