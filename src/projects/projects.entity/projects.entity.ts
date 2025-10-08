import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column({ type: 'text' })
  Description: string;

  // ✅ Head (main) image
  @Column({ nullable: true })
  headImage?: string;

  // ✅ Extra images (stored as JSON array of file paths)
  @Column('simple-array', { nullable: true })
  extraImages?: string[];
}
