import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
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

    @Get('by-stop-id/:id')
    public test(@Param('id') stopId: string, @Query('t') timestamp: string): Promise<StopTime[]> {
        return this.appService.getTimesByStopId(stopId, timestamp)
            .catch(error => {
                console.error(`test error`, error);
                throw new HttpException({ error: error?.message, message: 'Cannot get stop times.' }, 400);
            });
    }
}
