import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contract_address: string;

  @Column()
  token_index: string;

  @Column("double")
  listing_price: number;

  @Column()
  maker: string;

  @Column()
  listing_from: Date;

  @Column()
  listing_to: Date;

  @Column()
  event_timestamp: Date;
}
