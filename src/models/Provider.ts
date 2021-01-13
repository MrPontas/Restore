import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '../models/User';
import productsRouter from '../routes/products.routes';
import Product from './Product';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('boolean')
  active: boolean;

  @ManyToOne(() => User, user => user.providers, { eager: true })
  user: User;

  @OneToMany(type => Product, provider => Provider)
  products: Product[];
}
export default Provider;
