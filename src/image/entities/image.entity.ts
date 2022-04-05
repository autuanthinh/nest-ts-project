import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'integer', nullable: true })
  owner: number;

  @Column({ type: 'text' })
  bucket: string;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'text' })
  e_tag: string;

  @Column({ type: 'text' })
  location: string;

  @Column({ length: 20 })
  mimetype: string;

  @Column({ length: 20 })
  type: string;

  @Column({ type: 'integer' })
  width: number;

  @Column({ type: 'integer' })
  height: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  create_at: Date;
}
