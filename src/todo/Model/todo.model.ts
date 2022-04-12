import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TodoStatusEnum } from "../enums/todo-status";

export class Todo {
    constructor(
      public id: number,
      public name: string = '',
      public description: string = '',
      public createdAt = new Date(),
      public status: TodoStatusEnum = TodoStatusEnum.waiting,
    ) {}
  }