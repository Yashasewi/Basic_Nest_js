import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('signIn')
    signIn(@Body() dto: AuthDto) {
        console.log(dto);
        return this.auth.signIn(dto);
    }

    @Post('signUp')
    signUp(@Body() dto: CreateUserDto) {
        return this.auth.signUp(dto);
    }
    @Delete('removeUser')
    DeleteUser(@Body() dto: AuthDto) {
        return this.auth.DeleteUser(dto);
    }
    @Put('updateUser')
    UpdateUser(@Body() dto: CreateUserDto) {
        return this.auth.UpdateUser(dto);
    }
}
