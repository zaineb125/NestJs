import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cv  {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column()
  path: string;

  @ManyToMany((MyTargetEntity) => Skill, (skill) => skill.cvs, {
    eager: false,
  })
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
  @ManyToOne((TargetEntity) => User, (user) => user.cvs, {})
  user: User;
}