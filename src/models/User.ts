import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar(100)')
  name: string;
  @Column('varchar(25)')
  login: string;
  @Column('varchar(20)')
  password: string;
  @Column('boolean')
  administrator: boolean;
  @Column('varchar(255)')
  email?: string;
}
export default User;
