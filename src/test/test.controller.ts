import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('yo')
export class TestController {
    constructor(private testService: TestService) {}

    @Get('test')
    justtest() {
        return this.testService.justtest();
    }

    @Get('test1')
    justtest1() {
        return this.testService.justtest1();
    }
}
