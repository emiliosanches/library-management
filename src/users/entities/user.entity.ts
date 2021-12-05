import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Exclude, classToPlain } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public full_name: string;
  
  @Column()
  public cpf: string;
  
  @Column()
  public role: 'USER' | 'EMPLOYEE' | 'ADMIN';
  
  @Exclude({ toPlainOnly: true })
  @Column()
  public password: string;

  @Column()
  public is_active: boolean;

  @Column()
  public deactivation_reason: string;

  toJSON() {
    return classToPlain(this);
  }
}
