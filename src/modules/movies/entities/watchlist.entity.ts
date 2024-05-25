import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from 'src/modules/profiles/entities/profile.entity';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Profile, (profile) => profile.watchlist)
  @JoinColumn()
  profile: Profile;

  @Column('jsonb', { default: [] })
  movies: {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    already_watched: boolean;
  }[];
}
