import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('varchar')
  description?: string;
  @Column('varchar')
  user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  userObject: User;
}
export default Category;
