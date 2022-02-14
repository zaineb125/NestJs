import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('premier')
export class PremierController {
    @Get()
    getPremier():string{
        return 'GET';
    }

    @Post()
    postPremier (){
        return 'POST';
    }

    @Delete()
    deletePremier(){
        return 'Delete';
    }
    @Patch()
    patchPremier(){
        return 'patch';
    }


}
