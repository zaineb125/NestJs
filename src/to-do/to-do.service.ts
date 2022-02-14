import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from 'src/todo/Dto/AddTodotDo';
import { UpdateTodoDto } from 'src/todo/Dto/UpdateToDoDto';
import { Todo } from 'src/todo/Model/todo.model';

@Injectable()
export class ToDoService {

    findTodo(id:number,toDo:Todo[]) :Todo {
        const todo = toDo.find(todo=>todo.id==id);
        
        if(!todo)  throw new NotFoundException() ;
        else return todo ;
    }    
    
    delete (toDos:Todo[],id:number){
        const todo = this.findTodo(id,toDos);
        
        const index =toDos.indexOf(todo);
        toDos.splice(index,1);
        return toDos;
    }

    getTodo(toDos:Todo[],id:number){
        return this.findTodo(id,toDos) ;
    }

    updateTodo(toDos:Todo[],id:number,updatetodoDto:UpdateTodoDto){
        const todo = this.findTodo(id,toDos);
        
        const index =toDos.indexOf(todo);
        toDos[index].name=updatetodoDto.name ;
        toDos[index].description=updatetodoDto.description ;        
        return toDos ;
    }

    addToDo(toDos:Todo[],addTodoDto:AddTodoDto){
        let todo=new Todo();
        todo.id = toDos[toDos.length-1].id +1 ;
        todo.name=addTodoDto.name ;
        todo.description = addTodoDto.description ;
        toDos.push(todo);
        return toDos;
    }



}
