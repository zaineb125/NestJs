import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../enums/todo-status";
import { AddTodoDto } from "./AddTodotDo";

export class UpdateTodoDto extends PartialType(AddTodoDto) {
    @IsEnum(TodoStatusEnum)
    @IsOptional()
    status:TodoStatusEnum ;
}