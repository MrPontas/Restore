import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import User from '../models/User';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('boolean')
  active: boolean;
  @Column('varchar')
  user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  userObject: User;
}
export default Provider;
