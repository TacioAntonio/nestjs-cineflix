import { Watchlist } from 'src/modules/movies/entities/watchlist.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @OneToOne(() => Watchlist, (watchlist) => watchlist.id)
  @JoinColumn()
  watchlist: Watchlist;
}
