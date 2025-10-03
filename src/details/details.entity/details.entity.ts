import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Details {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  Fullname!: string;

  @Column()
  Email!: string;

  @Column({ type: 'varchar', length: 20 })
  Phonenumber!: string;

  @Column()
  Services_required!: string;

  @Column()
  Plotsize!: string;

  @Column()
  City!: string;

  @Column()
  Site_location!: string;

  @Column()
  Requirement!: string;
}
