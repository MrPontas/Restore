import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @Column('varchar')
  user: string;
}
export default Provider;
