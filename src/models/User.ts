import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from './Category';
import Product from './Product';
import Provider from './Provider';
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column({ select: false, type: 'varchar' })
  login: string;
  @Column({ select: false, type: 'varchar' })
  password: string;
  @Column('boolean')
  administrator: boolean;
  @Column({ select: false, type: 'varchar' })
  email?: string;

  @OneToMany(type => Provider, user => User)
  providers: Provider[];

  @OneToMany(type => Category, user => User)
  categories: Category[];

  @OneToMany(type => Product, user => User)
  products: Product[];
}
export default User;
