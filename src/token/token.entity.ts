import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contract_address: string;

  @Column()
  index: string;

  @Column("double", {nullable: true})
  current_price: number;
}
