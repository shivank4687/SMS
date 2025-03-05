import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity'; // Import the User entity

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: "enum", enum: ['active', 'inactive', 'suspended'], default: 'active' })
  status: string;

  @OneToMany(() => User, (user) => user.role) // One-to-Many relationship with User
  users: User[]; // This will store an array of User entities
}