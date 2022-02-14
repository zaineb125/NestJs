import { TodoStatusEnum } from "../enums/todo-status";

export class Todo{
 
    constructor(
        public id :number=0,
        public name:string ='',
        public description:string='',
        public createdAt = new Date(),
        public status:TodoStatusEnum = TodoStatusEnum.waiting
        ){}
        
        
    

}