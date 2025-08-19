import { Controller, Get, Req } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import type { Request } from "express";
import { Auth } from "../auth/decorators/auth.decourator";

@Controller('user')
export class UserController {

    constructor(){}

    @ApiOperation({summary:'get user profile'})
    @Get('profile')
    @Auth()
    getProfile(@Req() req: Request){
        return req.user;
    }
}  