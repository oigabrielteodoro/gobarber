import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    if (!this.avatar) {
      return 'https://api.adorable.io/avatars/120/abott@adorable.png';
    }

    switch (uploadConfig.driver) {
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      default:
        return 'https://api.adorable.io/avatars/120/abott@adorable.png';
    }
  }
}

export default User;
