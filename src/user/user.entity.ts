import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 64 })
  password: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  create_at: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  update_at: Date;
}
