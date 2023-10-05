import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private testService: AuthService) {}

    @Post('signIn')
    signIn(@Body() dto: AuthDto) {
        console.log(dto);
        return this.testService.signIn(dto);
    }

    @Post('signUp')
    signUp(@Body() dto: AuthDto) {
        return this.testService.signUp(dto);
    }
}
