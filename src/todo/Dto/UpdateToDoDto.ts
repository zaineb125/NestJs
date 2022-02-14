import { PartialType } from "@nestjs/mapped-types";
import { TodoStatusEnum } from "../enums/todo-status";
import { AddTodoDto } from "./AddTodotDo";

export class UpdateTodoDto extends PartialType(AddTodoDto) {
    
    status:TodoStatusEnum = TodoStatusEnum.waiting;
}