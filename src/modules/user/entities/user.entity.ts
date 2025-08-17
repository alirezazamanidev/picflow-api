import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  fullname: string;
  @Column({ nullable: true })
  bio: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;
  @Column({})
  hashedPassword: string;
  @Column({ default: false })
  private: boolean;
  @Column({ default: 'user' })
  role: string;
  @Column({ default: false })
  isEmailVerifyed: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
