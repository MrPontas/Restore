import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import productsRouter from '../routes/products.routes';
import Product from './Product';
import User from './User';

export enum Type {
  INPUT = 'I',
  OUTPUT = 'O',
}

@Entity('registers')
class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('enum')
  type: Type;
  @Column('datetime')
  created_at: Date;
  @Column('varchar')
  reason: string;

  @ManyToOne(() => User, user => user.registers)
  user: User;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({
    name: 'registers_products',
    joinColumn: {
      name: 'registerId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
export default Register;
