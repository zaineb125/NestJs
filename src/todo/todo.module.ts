import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import {  Todo } from './Model/todo.model';
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TodoEntity]
    )
  ],
  controllers: [TodoController],
  providers: [ToDoService],
  exports: [ToDoService],
})
export class TodoModule {}
