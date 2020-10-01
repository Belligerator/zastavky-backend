import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { StopTime } from './entities/stop-time.entity';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    public getHello(): string {
        return this.appService.getHello();
    }

    @Get('test')
    public test(): Promise<StopTime[]> {
        return this.appService.test()
            .catch(error => {
                console.error(`test error`, error);
                throw new HttpException({ error: error?.message, message: 'Cannot follow opportunity.' }, 400);
            });
    }
    
    @Get('test2')
    public test2(): Promise<StopTime[]> {
        return this.appService.test2()
            .catch(error => {
                console.error(`test error`, error);
                throw new HttpException({ error: error?.message, message: 'Cannot follow opportunity.' }, 400);
            });
    }
}
