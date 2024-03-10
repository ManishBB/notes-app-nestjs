import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {

    @UseGuards(AuthGuard('jwt'))
    @Get()
    profile(@Request() req: any) {
        console.log(req.user);
        
        return "Hello"
    }
}
