import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTodoDto } from 'src/todo/Dto/AddTodotDo';
import { UpdateTodoDto } from 'src/todo/Dto/UpdateToDoDto';
import { TodoEntity } from 'src/todo/entities/todo.entity';
import { Brackets, Like, Repository } from 'typeorm';
import { StatusCritereDto } from './Dto/StatusCritereDto';
import { TodoStatusEnum } from './enums/todo-status';
import { Todo } from './Model/todo.model';

@Injectable()
export class ToDoService {

    constructor(
        @InjectRepository(TodoEntity)
        private todoRepository: Repository<TodoEntity>,
    ){}

    findTodo(id:number,toDo:Todo[]) :Todo {
        const todo = toDo.find(todo=>todo.id==id);
        
        if(!todo)  throw new NotFoundException() ;
        else return todo ;
    } 
    
    async getDbTodo(id:number)  {
        await this.todoRepository.findOne(id);
    }
    
    async getTodos() {
        await this.todoRepository.find();
    }

    async getTodosWithPagination(page : number) {
        return await this.todoRepository.createQueryBuilder("todo")
        .take(5)
        .skip((page - 1) * 5 ) 
        .getMany()
        ;
    }

    async getTodoStats() {
        const count = await this.todoRepository
        .createQueryBuilder("todo")
        .select( "status , count(todo.createdAt) as count" )
        .groupBy('status')
        .getRawMany() ;
        return count ;
    }

    async getTodoWithCritere(statusCritereDto :StatusCritereDto) {
        const queryBuilder = this.todoRepository.createQueryBuilder("todo");
        console.log(statusCritereDto) ;
        return await queryBuilder
        .where(new Brackets(qb =>{ 
            qb.where({ name: Like(`%${statusCritereDto.critere}%`) })
            qb.orWhere({ description: Like(`%${statusCritereDto.critere}%`) })
        }))
        .andWhere('todo.status = :status' , {status: statusCritereDto.status})
        .getMany();
    }
    
    delete (toDos:Todo[],id:number){
        const todo = this.findTodo(id,toDos);
        
        const index =toDos.indexOf(todo);
        toDos.splice(index,1);
        return toDos;
    }

    async deleteDbTodo (id:number){
        return await this.todoRepository.delete(id);
    }

    async softdelete(id: number) {
        return await this.todoRepository.softDelete(id);
    }

    async restoreTodo(id: number) {
        const todoToRecover = await this.todoRepository.findOne(id);
        return await this.todoRepository.recover(todoToRecover);
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

    async updateDbTodo(id:number,updatetodoDto:UpdateTodoDto){
        return await this.todoRepository.update(id, updatetodoDto);
    }

    addToDo(toDos:Todo[],addTodoDto:AddTodoDto){
        let todo: Todo;
        todo.id = toDos[toDos.length-1].id +1 ;
        todo.name=addTodoDto.name ;
        todo.description = addTodoDto.description ;
        toDos.push(todo);
        return toDos;
    }

    addDbTodo(todo:AddTodoDto) : Promise<TodoEntity> {
        return this.todoRepository.save(todo);
    }

}
