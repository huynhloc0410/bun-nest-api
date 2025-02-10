import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ type: 'timestamp', nullable: true })
  loginTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  logoutTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
