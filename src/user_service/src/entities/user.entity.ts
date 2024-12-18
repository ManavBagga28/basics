import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { IsEmail, Length } from "class-validator";  // Add validation decorators if needed
  
  @Entity('user')
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", unique: true })
    @IsEmail()
    email!: string;
  
    @Column({ type: "varchar" })
    @Length(3, 20)
    username!: string;
  
    @Column({ type: "varchar" })
    password!: string; 
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  