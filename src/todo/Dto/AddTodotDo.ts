import { IsNotEmpty, MaxLength, MinLength, ValidationArguments } from "class-validator";
import { Errors } from "./errors";

export class AddTodoDto {
    @MinLength(3 , {
        message: (validationData: ValidationArguments) => 
            Errors.minLengthError(validationData)        
        })
    @MaxLength(10, {
        message: (validationData: ValidationArguments) => 
            Errors.maxLengthError(validationData)        
        })
    @IsNotEmpty({
        message: (validationData: ValidationArguments) => 
            Errors.requiredError(validationData)        
        })
    name:string;
    @MinLength(10 ,{
        message: (validationData: ValidationArguments) => 
            Errors.requiredError(validationData)        
        }  )
    description:string;
}