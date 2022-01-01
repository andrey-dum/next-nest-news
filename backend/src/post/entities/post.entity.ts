import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  categoty?: string;

  @Column({ nullable: true })
  tags?: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}
