import { UpdateTodoDto } from '../Dto/UpdateToDoDto';
import { AddTodoDto } from '../Dto/AddTodotDo';
import { Todo } from './../Model/todo.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ToDoService } from 'src/to-do/to-do.service';

@Controller('todo')
export class TodoController {
   
    constructor(private toDoService:ToDoService){
        this.todos = [new Todo(1,"Sport","Faire du sport"),new Todo(2,"Sport","Faire du sport")];
    }
    todos:Todo[]=[];
    
    
    @Get()
    getTodos(@Req()request):Todo[]{
        return this.todos ;
    } 
    
    @Get('/:id')
    getToDoId(@Param('id')id):Todo {
       return this.toDoService.getTodo(this.todos,id);
    }

   

    @Delete('/:id')
    deleteToDoID(@Param('id')id):Todo[]{
       return this.toDoService.delete(this.todos,id);
    }

    @Patch('/:id')
    updateToDo(@Param('id')id, @Body()body : UpdateTodoDto): Todo[]{
        return  this.toDoService.updateTodo(this.todos,id,body);
    }
    
    @Post()
    addTodo(@Body() newTodo:AddTodoDto):Todo[]{
        return this.toDoService.addToDo(this.todos,newTodo);
    }
    
}
