import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import productsRouter from '../routes/products.routes';
import Category from './Category';
import Mold from './Mold';
import Provider from './Provider';
import User from './User';

export enum Genre {
  FEMALE = 'F',
  MALE = 'M',
}

export enum Size {
  PP = 'PP',
  P = 'P',
  M = 'M',
  G = 'G',
  GG = 'GG',
  SIZE_33 = '33',
  SIZE_34 = '34',
  SIZE_35 = '35',
  SIZE_36 = '36',
  SIZE_37 = '37',
  SIZE_38 = '38',
  SIZE_39 = '39',
  SIZE_40 = '40',
  SIZE_41 = '41',
  SIZE_42 = '42',
  SIZE_43 = '43',
  SIZE_44 = '44',
  SIZE_45 = '45',
  SIZE_46 = '46',
  SIZE_47 = '47',
  SIZE_48 = '48',
  SIZE_49 = '49',
  SIZE_50 = '50',
  SIZE_51 = '51',
  SIZE_52 = '52',
}

export enum Status {
  IN_STOCK = 'I',
  OUTPUT = 'O',
}

enum Purchase_type {
  CONSIGNED = 'C',
  OWNER = 'O',
}
@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('enum')
  genre: Genre;
  @Column('varchar')
  color: string;
  @Column('enum')
  size: Size;
  @Column('enum')
  status: Status;
  @Column('datetime')
  created_at: Date;
  @Column('varchar')
  id_photo?: string;
  @Column('varchar')
  obs?: string;
  @Column('float')
  sale_value: number;
  @Column('float')
  purchase_value: number;
  @Column('enum')
  purchase_type: Purchase_type;
  @Column('varchar')
  brand: string;

  @ManyToOne(() => User, user => user.products, { eager: true })
  user: User;

  @ManyToOne(() => Provider, provider => provider.products, { eager: true })
  provider: Provider;

  @ManyToOne(() => Category, category => category.products, { eager: true })
  category: Category;

  @ManyToOne(() => Mold, (mold: Mold) => mold.products, { eager: true })
  mold: Mold;
}
export default Product;
