import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';
import User from './User';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('varchar')
  description?: string;

  @ManyToOne(type => User, categories => Category, { eager: true })
  user: User;

  @OneToMany(type => Product, category => category.id)
  products: Product[];
}
export default Category;
