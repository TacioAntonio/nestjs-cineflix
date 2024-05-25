import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/modules/profiles/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
