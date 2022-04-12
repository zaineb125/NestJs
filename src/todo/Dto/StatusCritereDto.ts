import { IsEnum, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../enums/todo-status";

export class StatusCritereDto {
    @IsOptional()
    critere: string;

    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status: TodoStatusEnum;
}