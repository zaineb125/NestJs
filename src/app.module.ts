import { TodoController } from './todo/todo/todo.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierController } from './premier/premier/premier.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ToDoService } from './todo/todo.service';
import { FirstMiddleware } from './todo/First.middleware';
import { logger } from './todo/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PremierModule, 
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      }),
    TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
      debug: true,
    }),
    CvModule,
    SkillModule,
    UserModule
  ],
  controllers: [AppController, PremierController,TodoController],
  providers: [AppService],
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
