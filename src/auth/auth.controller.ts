import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('signIn')
    signIn(@Body() dto: AuthDto) {
        console.log(dto);
        return this.auth.signIn(dto);
    }

    @Post('signUp')
    signUp(@Body() dto: AuthDto) {
        return this.auth.signUp(dto);
    }
    @Delete('removeUser')
    DeleteUser(@Body() dto: AuthDto) {
        return this.auth.DeleteUser(dto);
    }
}
