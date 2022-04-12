import { UpdateTodoDto } from '../Dto/UpdateToDoDto';
import { AddTodoDto } from '../Dto/AddTodotDo';
import { Todo } from './../Model/todo.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Version } from '@nestjs/common';
import { ToDoService } from '../todo.service';
import { ConfigService } from '@nestjs/config';
import { TodoEntity } from '../entities/todo.entity';
import { StatusCritereDto } from '../Dto/StatusCritereDto';

@Controller('todo')
export class TodoController {
   
    constructor(private toDoService:ToDoService, private configService:ConfigService){
        console.log(this.configService.get('name'));
    }
    todos:Todo[]=[];
    
    
    @Get()
    @Version('1')
    getTodos(@Req()request):Todo[]{
        return this.todos ;
    } 

    @Get()
    @Version('2')
    getDbTodos(@Req()request){
        return this.toDoService.getTodos();
    }

    @Get('/page/:page')
    getDbTodosWithPagination(@Req()request , @Param('page')page){
        return this.toDoService.getTodosWithPagination(page);
    }

    @Get('/stats')
    getDbTodoStats(@Req()request){
        return this.toDoService.getTodoStats();
    }

    @Post('/critere')
    getDbTodosWithCriteria(@Body()body : StatusCritereDto){
        return this.toDoService.getTodoWithCritere(body);
    }
    
    @Get('/:id')
    @Version('1')
    getToDoId(@Param('id')id):Todo {
       return this.toDoService.getTodo(this.todos,id);
    }

    @Get('/:id')
    @Version('2')
    getDbToDoId(@Param('id')id) {
       return this.toDoService.getDbTodo(id);
    }

    @Delete('/:id')
    @Version('1')
    deleteToDoID(@Param('id')id):Todo[]{
       return this.toDoService.delete(this.todos,id);
    }

    @Delete('/:id')
    @Version('2')
    deleteDbToDoID(@Param('id')id){
       return this.toDoService.deleteDbTodo(id);
    }

    @Delete('/:id')
    @Version('3')
    deleteSoftToDoID(@Param('id')id){
       return this.toDoService.softdelete(id);
    }

    @Post('/restore/:id')
    restore(@Param('id')id){
        return this.toDoService.restoreTodo(id);
    }

    @Patch('/:id')
    @Version('1')
    updateToDo(@Param('id')id, @Body()body : UpdateTodoDto): Todo[]{
        return  this.toDoService.updateTodo(this.todos,id,body);
    }

    @Patch('/:id')
    @Version('2')
    updateDbToDo(@Param('id')id, @Body()body : UpdateTodoDto){
        return  this.toDoService.updateDbTodo(id,body);
    }

    @Post()
    @Version('1')
    addTodo(@Body() newTodo:AddTodoDto):Todo[]{
        return this.toDoService.addToDo(this.todos,newTodo);
    }

    @Post()
    @Version('2')
    addDbTodo(@Body() newTodo:AddTodoDto):Promise<TodoEntity>{
        return this.toDoService.addDbTodo(newTodo);
    }
    
}
