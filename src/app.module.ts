import { TodoController } from './todo/todo/todo.controller';
import { Todo } from './todo/Model/todo.model';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierController } from './premier/premier/premier.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ToDoService } from './to-do/to-do.service';

@Module({
  imports: [PremierModule, TodoModule],
  controllers: [AppController, PremierController,TodoController],
  providers: [AppService, ToDoService],
})
export class AppModule {}
