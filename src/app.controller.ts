import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { StopTime } from './entities/stop-time.entity';
import moment = require('moment');
import { ExtendedHttpException } from './models/http-exception';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    public getHello(): string {
        return this.appService.getHello();
    }

    @Get('by-stop-id/:id')
    public byStopId(@Param('id') stopId: string, @Query('date') date: string): Promise<StopTime[]> {
        return this.appService.getTimesByStopId(stopId, date)
            .catch(error => {
                console.error(`test error`, error);
                throw new ExtendedHttpException(
                    error,
                    `POST /by-stop-id/${stopId} ERROR:`,
                    {
                        error: error?.message,
                        message: error?.message || 'Cannot get stop times.',
                        title: error?.title || 'Error.'
                    }, error.statusCode || 500);
            });
    }

    @Post('by-coordinates')
    public byCoordinates(@Body('date') date: string, @Body('lat') lat: number, @Body('lon') lon: number): Promise<{ station: string, distance: number, stoptimes: StopTime[] }> {
        return this.appService.getTimesByCoordinates(date, lat, lon)
            .catch(error => {
                throw new ExtendedHttpException(
                    error,
                    `POST /by-coordinates ERROR:`,
                    {
                        error: error?.message,
                        message: error?.message || 'Cannot get stop times.',
                        title: error?.title || 'Error.'
                    }, error.statusCode || 500);
            });
    }
}
