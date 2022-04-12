import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;
  @Column()
  @Expose()
  designation: string;
  @ManyToMany((MyTargetEntity) => Cv, (cv) => cv.skills)
  cvs: Cv[];
}