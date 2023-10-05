import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private testService: AuthService) {}

    @Post('singIn')
    signIn() {
        return this.testService.signIn();
    }

    @Post('signUp')
    signUp(@Body() dto: AuthDto) {
        return this.testService.signUp(dto);
    }
}
