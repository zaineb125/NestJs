import { Module } from '@nestjs/common';
import { ToDoService } from 'src/to-do/to-do.service';
import { TodoController } from './todo/todo.controller';

@Module({
  controllers: [TodoController],
  providers: [ToDoService]
})
export class TodoModule {}
