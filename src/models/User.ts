import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  name: string;
  @Column('varchar')
  login: string;
  @Column('varchar')
  password: string;
  @Column('boolean')
  administrator: boolean;
  @Column('varchar')
  email?: string;
}
export default User;
