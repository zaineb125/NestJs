import { TodoController } from './todo/todo/todo.controller';
import { Todo } from './todo/Model/todo.model';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierController } from './premier/premier/premier.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ToDoService } from './to-do/to-do.service';
import { FirstMiddleware } from './todo/First.middleware';
import { logger } from './todo/logger.middleware';

@Module({
  imports: [PremierModule, TodoModule],
  controllers: [AppController, PremierController,TodoController],
  providers: [AppService, ToDoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes('todo');
    consumer
      .apply(logger)
      .forRoutes(TodoController);
  }
}
