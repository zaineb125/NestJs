import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TodoStatusEnum } from "../enums/todo-status";

@Entity('todo')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id :number ;

    @Column()
    name:string ;

    @Column()
    description:string;

    @CreateDateColumn({update: false})
    createdAt:Date ;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({type: 'enum', enum: TodoStatusEnum, default: TodoStatusEnum.waiting})
    status:TodoStatusEnum = TodoStatusEnum.waiting;

}