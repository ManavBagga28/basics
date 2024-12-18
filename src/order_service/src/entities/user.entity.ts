import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')  // This will create a table named 'users'
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column('number')
  iat!: number; // JWT issued at timestamp (bigint can store large numbers)

  @Column('number')
  exp!: number; // JWT expiration timestamp (bigint can store large numbers)
}
