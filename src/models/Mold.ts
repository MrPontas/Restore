import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';

@Entity('models')
class Mold {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;

  @OneToMany(type => Product, mold => Mold)
  products: Product[];
}
export default Mold;
